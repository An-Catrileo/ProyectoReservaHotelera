<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Room;
use App\Models\Bed;
use App\Models\Amenity;
use App\Models\Complement;
use App\Models\Image;
use App\Models\Reservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;

class RoomModelTest extends TestCase
{
  use RefreshDatabase;

  /** @test */
  public function it_has_morphed_many_images()
  {
    // Crear habitación
    $room = Room::factory()->create();

    // Crear imágenes asociadas
    Image::factory()->count(3)->create([
      'model_type' => Room::class,
      'model_id' => $room->id
    ]);

    // Verificar relación
    $this->assertInstanceOf(Collection::class, $room->images);
    $this->assertCount(3, $room->images);
    $this->assertInstanceOf(Image::class, $room->images->first());
  }

  /** @test */
  public function it_belongs_to_many_complements()
  {
    // Crear habitación y complementos
    $room = Room::factory()->create();
    $complements = Complement::factory()->count(2)->create();

    // Asociar complementos a la habitación
    $room->complements()->attach($complements->pluck('id'));

    // Verificar relación
    $this->assertInstanceOf(Collection::class, $room->complements);
    $this->assertCount(2, $room->complements);
    $this->assertInstanceOf(Complement::class, $room->complements->first());
  }

  /** @test */
  public function it_belongs_to_many_amenities()
  {
    // Crear habitación y comodidades
    $room = Room::factory()->create();
    $amenities = Amenity::factory()->count(4)->create();

    // Asociar comodidades a la habitación
    $room->amenities()->attach($amenities->pluck('id'));

    // Verificar relación
    $this->assertInstanceOf(Collection::class, $room->amenities);
    $this->assertCount(4, $room->amenities);
    $this->assertInstanceOf(Amenity::class, $room->amenities->first());
  }

  /** @test */
  public function it_belongs_to_many_beds_with_quantity()
  {
    // Crear habitación y camas
    $room = Room::factory()->create();
    $beds = Bed::factory()->count(2)->create();

    // Asociar camas a la habitación con cantidades
    $room->beds()->attach([
      $beds[0]->id => ['quantity' => 2],
      $beds[1]->id => ['quantity' => 1]
    ]);

    // Verificar relación
    $this->assertInstanceOf(Collection::class, $room->beds);
    $this->assertCount(2, $room->beds);
    $this->assertInstanceOf(Bed::class, $room->beds->first());

    // Verificar el dato pivote (quantity)
    $this->assertEquals(2, $room->beds->first()->pivot->quantity);
    $this->assertEquals(1, $room->beds->last()->pivot->quantity);
  }

  /** @test */
  public function it_has_many_reservations()
  {
    // Crear habitación
    $room = Room::factory()->create();

    // Crear reservaciones para esta habitación
    Reservation::factory()->count(3)->create(['room_id' => $room->id]);

    // Verificar relación
    $this->assertInstanceOf(Collection::class, $room->reservations);
    $this->assertCount(3, $room->reservations);
    $this->assertInstanceOf(Reservation::class, $room->reservations->first());
  }

  /** @test */
  public function it_sets_default_attributes()
  {
    // Crear habitación sin especificar atributos
    $room = new Room();

    // Verificar valores predeterminados
    $this->assertEquals(1, $room->quantity);
    $this->assertEquals(1, $room->active);
    $this->assertEquals(1, $room->adults);
    $this->assertEquals(0, $room->kids);
    $this->assertEquals(0, $room->home);
    $this->assertEquals(0, $room->about);
    $this->assertEquals('', $room->name);
    $this->assertEquals('', $room->slug);
    $this->assertEquals('', $room->entry);
    $this->assertEquals('', $room->description);
    $this->assertNull($room->price);
    $this->assertNull($room->img);
    $this->assertNull($room->thumb);
  }
}
