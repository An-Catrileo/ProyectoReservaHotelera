<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reservation_date = fake()->dateTimeInInterval('-5 month', '+5 month');

        $start_date = $reservation_date;
        $nights = rand(2, 8);
        $end_date = $reservation_date->modify('+' . $nights . ' day');

        $price = rand(80, 200);
        $sub_total = $price * $nights;
        $tax_percent = 10;
        $tax_amount = $sub_total * ($tax_percent / 100);
        $total = $sub_total + $tax_amount;

        return [
            'code' => fake()->bothify('?#?#?#?#'),
            'start_date' => $start_date,
            'end_date' => $end_date,
            'nights' => $nights,
            'special_request' => fake()->sentence(),
            'adults' => rand(1, 3),
            'price' => $price,
            'sub_total' => $sub_total,
            'tax_percent' => $tax_percent,
            'tax_amount' => $tax_amount,
            'total' => $total,
            'data' => json_encode([
                'guest_name' => fake()->name(),
                'guest_email' => fake()->email(),
                'guest_phone' => fake()->phoneNumber(),
            ])
        ];
    }
}
