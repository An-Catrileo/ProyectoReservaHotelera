<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Room;
use App\Models\User;
use App\Models\Discount;
use App\Models\Payment;
use App\Models\Reservation;
use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReservationModelTest extends TestCase
{
  use RefreshDatabase;

  /** @test */
  public function it_belongs_to_a_room()
  {
    $room = Room::factory()->create();
    $reservation = Reservation::factory()->create(['room_id' => $room->id]);

    $this->assertInstanceOf(Room::class, $reservation->room);
    $this->assertEquals($room->id, $reservation->room->id);
  }

  /** @test */
  public function it_belongs_to_a_user()
  {
    $user = User::factory()->create();
    $reservation = Reservation::factory()->create(['user_id' => $user->id]);

    $this->assertInstanceOf(User::class, $reservation->user);
    $this->assertEquals($user->id, $reservation->user->id);
  }

  /** @test */
  public function it_can_belong_to_a_discount()
  {
    $discount = Discount::factory()->create();
    $reservation = Reservation::factory()->create(['discount_id' => $discount->id]);

    $this->assertInstanceOf(Discount::class, $reservation->discount);
    $this->assertEquals($discount->id, $reservation->discount->id);
  }

  /** @test */
  public function it_can_have_many_payments()
  {
    $reservation = Reservation::factory()->create();

    // Crear 3 pagos para esta reservación
    Payment::factory()->count(3)->create(['reservation_id' => $reservation->id]);

    $this->assertCount(3, $reservation->payments);
    $this->assertInstanceOf(Payment::class, $reservation->payments->first());
  }

  /** @test */
  public function it_casts_attributes_correctly()
  {
    $reservation = Reservation::factory()->create([
      'start_date' => '2023-05-15',
      'end_date' => '2023-05-20',
      'total' => 500.50,
      'sub_total' => 450.00,
      'adults' => 2,
      'kids' => 1,
      'nights' => 5,
      'deposit_amount' => 150.00,
      'remaining_amount' => 350.50,
      'data' => ['guest_name' => 'John Doe', 'special_requests' => 'Early check-in'],
      'offer' => ['percent' => 10, 'amount' => 50],
      'state' => 'successful',
      'payment_status' => 'partially_paid'
    ]);

    // Verificar los tipos de datos
    $this->assertInstanceOf(\Carbon\Carbon::class, $reservation->start_date);
    $this->assertInstanceOf(\Carbon\Carbon::class, $reservation->end_date);
    $this->assertIsFloat($reservation->total);
    $this->assertIsFloat($reservation->sub_total);
    $this->assertIsInt($reservation->adults);
    $this->assertIsInt($reservation->kids);
    $this->assertIsInt($reservation->nights);
    $this->assertIsFloat($reservation->deposit_amount);
    $this->assertIsFloat($reservation->remaining_amount);
    $this->assertIsObject($reservation->data);
    $this->assertIsObject($reservation->offer);

    // Verificar enum casts
    $this->assertEquals(ReservationStatus::SUCCESSFUL, $reservation->state);
    $this->assertEquals(PaymentStatus::PARTIALLY_PAID, $reservation->payment_status);

    // Verificar valores específicos
    $this->assertEquals(2, $reservation->adults);
    $this->assertEquals('John Doe', $reservation->data->guest_name);
    $this->assertEquals(10, $reservation->offer->percent);
  }
}
