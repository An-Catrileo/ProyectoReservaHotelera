<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Payment;
use App\Models\Reservation;
use App\Enums\PaymentStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Mockery;

class PaymentControllerTest extends TestCase
{
  use RefreshDatabase;

  protected function setUp(): void
  {
    parent::setUp();

    // Mock de Inertia para que no intente renderizar vistas
    Inertia::shouldReceive('render')->andReturn(response()->json(['rendered' => true]));
  }

  /** @test */
  public function it_shows_payment_options_for_unpaid_reservation()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva sin pagar
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'total' => 300.00,
      'payment_status' => PaymentStatus::UNPAID,
      'user_id' => $user->id
    ]);

    // Acceder a la página de opciones de pago
    $response = $this->get(route('payment.options', ['code' => '12345678']));

    // Verificar que se muestra correctamente
    $response->assertStatus(200);
    $response->assertJson(['rendered' => true]);

    // Verificar que se actualizaron los montos de depósito y remanente
    $reservation->refresh();
    $this->assertEquals(round(300 * 0.3, 2), $reservation->deposit_amount);
    $this->assertEquals(round(300 * 0.7, 2), $reservation->remaining_amount);
  }

  /** @test */
  public function it_redirects_if_reservation_already_paid()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva ya pagada
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'payment_status' => PaymentStatus::PAID,
      'user_id' => $user->id
    ]);

    // Intentar acceder a la página de opciones de pago
    $response = $this->get(route('payment.options', ['code' => '12345678']));

    // Verificar redirección
    $response->assertRedirect(route('profile.reservation', ['code' => '12345678']));
    $response->assertSessionHas('message', 'Esta reserva ya ha sido pagada completamente.');
  }

  /** @test */
  public function it_processes_deposit_payment_successfully()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva sin pagar
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'total' => 300.00,
      'deposit_amount' => 90.00,
      'remaining_amount' => 210.00,
      'payment_status' => PaymentStatus::UNPAID,
      'user_id' => $user->id
    ]);

    // Enviar solicitud de pago de depósito
    $response = $this->post(route('payment.process', ['code' => '12345678']), [
      'paymentType' => 'deposit',
      'paymentMethod' => 'credit_card'
    ]);

    // Verificar que se creó el pago
    $this->assertDatabaseHas('payments', [
      'reservation_id' => $reservation->id,
      'amount' => 90.00,
      'type' => 'deposit',
      'status' => 'completed',
      'payment_method' => 'credit_card'
    ]);

    // Verificar que se actualizó el estado de la reserva
    $reservation->refresh();
    $this->assertEquals(PaymentStatus::PARTIALLY_PAID, $reservation->payment_status);

    // Verificar redirección a confirmación
    $response->assertRedirect(route('payment.confirmation', ['code' => '12345678']));
  }

  /** @test */
  public function it_processes_full_payment_successfully()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva sin pagar
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'total' => 300.00,
      'deposit_amount' => 90.00,
      'remaining_amount' => 210.00,
      'payment_status' => PaymentStatus::UNPAID,
      'user_id' => $user->id
    ]);

    // Enviar solicitud de pago completo
    $response = $this->post(route('payment.process', ['code' => '12345678']), [
      'paymentType' => 'full',
      'paymentMethod' => 'paypal'
    ]);

    // Verificar que se creó el pago
    $this->assertDatabaseHas('payments', [
      'reservation_id' => $reservation->id,
      'amount' => 300.00,
      'type' => 'deposit',  // Aunque es pago completo, se registra como "deposit"
      'status' => 'completed',
      'payment_method' => 'paypal'
    ]);

    // Verificar que se actualizó el estado de la reserva a pagado completamente
    $reservation->refresh();
    $this->assertEquals(PaymentStatus::PAID, $reservation->payment_status);

    // Verificar redirección a confirmación
    $response->assertRedirect(route('payment.confirmation', ['code' => '12345678']));
  }

  /** @test */
  public function it_processes_remaining_payment_for_partially_paid_reservation()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva parcialmente pagada
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'total' => 300.00,
      'deposit_amount' => 90.00,
      'remaining_amount' => 210.00,
      'payment_status' => PaymentStatus::PARTIALLY_PAID,
      'user_id' => $user->id
    ]);

    // Crear pago de depósito previo
    Payment::factory()->create([
      'reservation_id' => $reservation->id,
      'amount' => 90.00,
      'type' => 'deposit',
      'status' => 'completed'
    ]);

    // Enviar solicitud de pago restante
    $response = $this->post(route('payment.process', ['code' => '12345678']), [
      'paymentType' => 'remaining',
      'paymentMethod' => 'debit_card'
    ]);

    // Verificar que se creó el segundo pago
    $this->assertDatabaseHas('payments', [
      'reservation_id' => $reservation->id,
      'amount' => 210.00,
      'type' => 'remaining',
      'status' => 'completed',
      'payment_method' => 'debit_card'
    ]);

    // Verificar que se actualizó el estado de la reserva a pagado completamente
    $reservation->refresh();
    $this->assertEquals(PaymentStatus::PAID, $reservation->payment_status);

    // Verificar que hay dos pagos en total
    $this->assertEquals(2, Payment::where('reservation_id', $reservation->id)->count());

    // Verificar redirección a confirmación
    $response->assertRedirect(route('payment.confirmation', ['code' => '12345678']));
  }

  /** @test */
  public function it_shows_payment_confirmation_page()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva con un pago
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'user_id' => $user->id
    ]);

    Payment::factory()->create([
      'reservation_id' => $reservation->id,
      'amount' => 90.00
    ]);

    // Acceder a la página de confirmación
    $response = $this->get(route('payment.confirmation', ['code' => '12345678']));

    // Verificar que se muestra correctamente
    $response->assertStatus(200);
    $response->assertJson(['rendered' => true]);
  }

  /** @test */
  public function it_shows_remaining_payment_page_for_partially_paid_reservation()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva parcialmente pagada
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'remaining_amount' => 210.00,
      'payment_status' => PaymentStatus::PARTIALLY_PAID,
      'user_id' => $user->id
    ]);

    // Acceder a la página de pago restante
    $response = $this->get(route('payment.remaining', ['code' => '12345678']));

    // Verificar que se muestra correctamente
    $response->assertStatus(200);
    $response->assertJson(['rendered' => true]);
  }

  /** @test */
  public function it_redirects_if_reservation_not_eligible_for_remaining_payment()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva sin pagar (no es elegible para pago restante)
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'payment_status' => PaymentStatus::UNPAID,
      'user_id' => $user->id
    ]);

    // Intentar acceder a la página de pago restante
    $response = $this->get(route('payment.remaining', ['code' => '12345678']));

    // Verificar redirección
    $response->assertRedirect(route('profile.reservation', ['code' => '12345678']));
    $response->assertSessionHas('message', 'Esta reserva no es elegible para pago restante.');
  }

  /** @test */
  public function it_validates_payment_process_request()
  {
    // Crear usuario y autenticarlo
    $user = User::factory()->create();
    $this->actingAs($user);

    // Crear una reserva
    $reservation = Reservation::factory()->create([
      'code' => '12345678',
      'user_id' => $user->id
    ]);

    // Enviar solicitud con datos inválidos
    $response = $this->post(route('payment.process', ['code' => '12345678']), [
      'paymentType' => 'invalid',
      'paymentMethod' => 'bitcoin'
    ]);

    // Verificar errores de validación
    $response->assertSessionHasErrors(['paymentType', 'paymentMethod']);
  }

  protected function tearDown(): void
  {
    Mockery::close();
    parent::tearDown();
  }
}
