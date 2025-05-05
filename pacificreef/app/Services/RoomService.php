<?php // Code within app\Helpers\Helper.php

namespace App\Services;

use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class RoomService
{
    public static function searchAvailableRoom($startDate, $endDate, $adults, $kids = 0, $nights = null)
    {
        // Si no se proporciona $nights, calcular basado en las fechas
        if ($nights === null) {
            $nights = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));
        }

        $rooms = Room::where('active', 1)
            ->where('adults', '>=', $adults)
            // ->where('remaining', '>', 0)
            ->when($kids, function (Builder $query, string $kids) {
                $query->where('kids', '>=', $kids);
            })
            ->with(['reservations' => function ($query)  use ($startDate, $endDate) {

                $query->where('state', 'successful');

                $query->where(function ($q) use ($startDate, $endDate) {

                    $q->whereBetween('start_date', [$startDate, $endDate])
                        ->orWhereBetween('end_date', [$startDate, $endDate]);
                });
                $query->orWhere(function ($q) use ($startDate, $endDate) {

                    $q->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
            }])
            ->with(['complements' => function ($query) {
                $query->where('active', 1);
                $query->where('type_price', '!=', 'free');
            }])
            ->get()
            ->filter(function ($value, $key) {

                return $value->quantity > $value->reservations->sum('quantity');
            });
        // ->transform(function ($item, $key) use ($nights) {

        //     $item->price_per_total_night = $item->price * $nights;

        //     $room_quantity_availables = $item->quantity - $item->reservations->sum('room_quantity');

        //     $room_quantity_availables_with_price = [];

        //     for ($i = 0; $i < $room_quantity_availables; $i++) {
        //         array_push($room_quantity_availables_with_price, $item->price_per_total_night * ($i + 1));
        //     }

        //     $item->quantity_availables = $room_quantity_availables_with_price;

        //     $item->complements->transform(function ($complement, $key) use ($nights) {

        //         if ($complement->type_price == 'night') {

        //             $complement->price_per_total_night = $complement->price * $nights;
        //         } elseif ($complement->type_price == 'reservation') {

        //             $complement->price_per_total_night = $complement->price;
        //         }
        //         return $complement;
        //     });

        //     return $item;
        // });
        return $rooms;
    }

    public static function applyOffer($price, $offer, $nights)
    {
        if (!$offer) {
            return $price * $nights;
        }

        // Aplicar descuento según la oferta
        $discountPercent = $offer->percent / 100;
        $discountedPrice = $price * (1 - $discountPercent);

        return $discountedPrice * $nights;
    }
}
