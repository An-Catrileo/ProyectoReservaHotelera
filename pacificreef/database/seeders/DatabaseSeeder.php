<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Image;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Schema::disableForeignKeyConstraints();
        Image::truncate();
        $this->call([
            BedSeeder::class,
            AmenitySeeder::class,
            ComplementSeeder::class,
            DiscountSeeder::class,
            GallerySeeder::class,
            PageSeeder::class,
            OfferSeeder::class,
            RoomSeeder::class,
            UserSeeder::class,
            ReservationSeeder::class,
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
