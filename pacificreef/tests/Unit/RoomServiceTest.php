<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Room;
use App\Models\Reservation;
use App\Services\RoomService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;
use Mockery;

class RoomServiceTest extends TestCase
{
  use RefreshDatabase;

  protected function setUp(): void
  {
    parent::setUp();
  }

  /** @test */
  public function it_finds_available_rooms_with_no_reservations()
  {
    // Crear habitaciones para las pruebas
    Room::factory()->create([
      'name' => 'Suite',
      'adults' => 2,
      'kids' => 2,
      'quantity' => 3,
      'active' => 1,
      'price' => 100.00
    ]);

    Room::factory()->create([
      'name' => 'Familiar',
      'adults' => 4,
      'kids' => 2,
      'quantity' => 2,
      'active' => 1,
      'price' => 150.00
    ]);

    Room::factory()->create([
      'name' => 'Individual',
      'adults' => 1,
      'kids' => 0,
      'quantity' => 5,
      'active' => 1,
      'price' => 75.00
    ]);

    $startDate = Carbon::now()->addDays(1);
    $endDate = Carbon::now()->addDays(5);

    // Buscar habitaciones disponibles para 2 adultos
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2);

    // Verificar que encontramos 2 habitaciones (Suite y Familiar, porque tienen capacidad para 2+ adultos)
    $this->assertEquals(2, $rooms->count());
    $this->assertTrue($rooms->contains('name', 'Suite'));
    $this->assertTrue($rooms->contains('name', 'Familiar'));
    $this->assertFalse($rooms->contains('name', 'Individual'));
  }

  /** @test */
  public function it_finds_available_rooms_with_existing_reservations()
  {
    // Crear habitación
    $room = Room::factory()->create([
      'name' => 'Suite',
      'adults' => 2,
      'kids' => 2,
      'quantity' => 3, // 3 habitaciones de este tipo
      'active' => 1,
      'price' => 100.00
    ]);

    // Crear reservación que ocupa 2 habitaciones (dejando 1 disponible)
    $reservation = Reservation::factory()->create([
      'room_id' => $room->id,
      'start_date' => Carbon::now()->addDays(2),
      'end_date' => Carbon::now()->addDays(4),
      'quantity' => 2,
      'state' => 'successful',
    ]);

    $startDate = Carbon::now()->addDays(1);
    $endDate = Carbon::now()->addDays(5);

    // Buscar habitaciones disponibles para 2 adultos
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2);

    // Debería encontrar la Suite porque aún tiene 1 habitación disponible (de 3 totales)
    $this->assertEquals(1, $rooms->count());
    $this->assertTrue($rooms->contains('name', 'Suite'));

    // Pero si buscamos para más habitaciones de las disponibles, no debería encontrar nada
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2, 0, 2);
    $this->assertEquals(0, $rooms->count());
  }

  /** @test */
  public function it_finds_rooms_based_on_guest_capacity()
  {
    // Crear habitaciones con diferentes capacidades
    Room::factory()->create([
      'name' => 'Standard',
      'adults' => 2,
      'kids' => 0,
      'quantity' => 5,
      'active' => 1,
    ]);

    Room::factory()->create([
      'name' => 'Family',
      'adults' => 2,
      'kids' => 2,
      'quantity' => 3,
      'active' => 1,
    ]);

    Room::factory()->create([
      'name' => 'Luxury Suite',
      'adults' => 4,
      'kids' => 2,
      'quantity' => 2,
      'active' => 1,
    ]);

    $startDate = Carbon::now()->addDays(1);
    $endDate = Carbon::now()->addDays(3);

    // Buscar habitaciones para 2 adultos y 0 niños
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2, 0);
    $this->assertEquals(3, $rooms->count()); // Todas las habitaciones pueden acomodar 2 adultos

    // Buscar habitaciones para 2 adultos y 1 niño
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2, 1);
    $this->assertEquals(2, $rooms->count()); // Solo Family y Luxury Suite pueden acomodar niños
    $this->assertFalse($rooms->contains('name', 'Standard'));

    // Buscar habitaciones para 3 adultos
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 3, 0);
    $this->assertEquals(1, $rooms->count()); // Solo Luxury Suite puede acomodar 3+ adultos
    $this->assertTrue($rooms->contains('name', 'Luxury Suite'));
  }

  /** @test */
  public function it_excludes_inactive_rooms()
  {
    // Crear habitaciones
    Room::factory()->create([
      'name' => 'Active Room',
      'adults' => 2,
      'quantity' => 3,
      'active' => 1,
    ]);

    Room::factory()->create([
      'name' => 'Inactive Room',
      'adults' => 2,
      'quantity' => 3,
      'active' => 0, // Inactiva
    ]);

    $startDate = Carbon::now()->addDays(1);
    $endDate = Carbon::now()->addDays(3);

    // Buscar habitaciones para 2 adultos
    $rooms = RoomService::searchAvailableRoom($startDate, $endDate, 2);

    // Solo debería encontrar la habitación activa
    $this->assertEquals(1, $rooms->count());
    $this->assertTrue($rooms->contains('name', 'Active Room'));
    $this->assertFalse($rooms->contains('name', 'Inactive Room'));
  }

  protected function tearDown(): void
  {
    parent::tearDown();
  }
}
