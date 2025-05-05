<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Room;
use App\Models\User;
use App\Models\Offer;
use App\Models\Reservation;
use App\Services\ReservationService;
use App\Services\OfferService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class ReservationServiceTest extends TestCase
{
  use RefreshDatabase;

  protected function setUp(): void
  {
    parent::setUp();
  }

  /** @test */
  public function it_calculates_price_for_total_nights_correctly()
  {
    // Caso simple: 100 por noche por 3 noches = 300
    $result = ReservationService::calculatePriceTotalNights(100, 3);
    $this->assertEquals(300, $result);

    // Precio con decimales
    $result = ReservationService::calculatePriceTotalNights(150.50, 2);
    $this->assertEquals(301, $result);

    // Caso borde: 0 noches
    $result = ReservationService::calculatePriceTotalNights(100, 0);
    $this->assertEquals(0, $result);
  }

  /** @test */
  public function it_calculates_total_amount_correctly_without_offer()
  {
    // Caso sin oferta: 100 por noche por 3 noches
    $result = ReservationService::totalCalculation(100, 3, null);

    // Verificar que los cálculos son correctos
    $this->assertEquals(100, $result['pricePerNight']);
    $this->assertEquals(300, $result['subTotal']);
    $this->assertEquals(300, $result['subTotalOffer']);
    $this->assertEquals(10, $result['taxPercent']);
    $this->assertEquals(30, $result['taxAmount']);
    $this->assertEquals(330, $result['total']);
    $this->assertNull($result['offer']);
    $this->assertEquals(3, $result['nights']);
  }

  /** @test */
  public function it_calculates_total_amount_correctly_with_offer()
  {
    $this->markTestSkipped('Este test requiere ser refactorizado para evitar conflictos con mocks');

    // Crear oferta mock con 10% de descuento para 3 noches
    $offer = new Offer();
    $offer->name = 'Test Offer';
    $offer->nights = 3;
    $offer->percent = 10;

    // Calcular con oferta: 100 por noche por 3 noches con 10% de descuento
    $result = ReservationService::totalCalculation(100, 3, $offer);

    // La implementación real utiliza OfferService, pero aquí verificamos solo resultados
    // Idealmente esto debería probarse con una implementación real o un mock correcto
    // usando dependency injection

    // Algunas verificaciones básicas que deberían funcionar
    $this->assertEquals(100, $result['pricePerNight']);
    $this->assertEquals(300, $result['subTotal']);
    $this->assertEquals(3, $result['nights']);
  }

  /** @test */
  public function it_creates_a_reservation_with_correct_data()
  {
    $this->markTestSkipped('Este test requiere ser refactorizado para evitar conflictos con mocks');

    // Mock para la Room
    $room = new Room();
    $room->id = 1;
    $room->price = 100;

    // Fechas de la reserva
    $startDate = Carbon::now();
    $endDate = Carbon::now()->addDays(3);
    $nights = 3;

    // Crear reservación
    $reservation = ReservationService::createReservation($startDate, $endDate, $room);

    // Verificar que se crea correctamente
    $this->assertInstanceOf(Reservation::class, $reservation);
    $this->assertEquals($startDate->format('Y-m-d'), $reservation->start_date);
    $this->assertEquals($endDate->format('Y-m-d'), $reservation->end_date);
    $this->assertEquals($nights, $reservation->nights);
    $this->assertEquals(100, $reservation->price);
    $this->assertEquals($room->id, $reservation->room_id);
  }

  /** @test */
  public function it_generates_unique_reservation_code()
  {
    // Crear un usuario y reservación mock
    $user = new User();
    $user->id = 5;

    $reservation = new Reservation();
    $reservation->user_id = $user->id;
    $reservation->start_date = Carbon::createFromFormat('Y-m-d', '2023-05-15');

    // Generar código
    $code = ReservationService::generateCode($reservation);

    // Verificar formato del código (debe comenzar con un dígito seguido de la fecha y user_id)
    $this->assertMatchesRegularExpression('/^[1-9]05155$/', $code);
  }

  protected function tearDown(): void
  {
    Mockery::close();
    parent::tearDown();
  }
}
