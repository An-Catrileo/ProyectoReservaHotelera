<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Http\Requests\ReservationRequest;
use App\Http\Requests\UserCheckoutRequest;
use App\Http\Resources\RoomResource;
use App\Mail\OrderShipped;
use App\Models\Reservation;
use App\Services\OfferService;
use App\Services\ReservationService;
use App\Services\RoomService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function searchRoom(ReservationRequest $request)
    {
        //dd($request->all());
        $start_date = Carbon::parse($request->start_date);
        $end_date = Carbon::parse($request->end_date);
        $nights = $start_date->diffInDays($end_date);

        // dd($start_date, $end_date);
        $rooms = RoomService::searchAvailableRoom($start_date, $end_date, $request->adults, $request->kids);
        $rooms->load('beds', 'amenities');
        $offer = OfferService::findOffer($nights);
        $rooms = $rooms->map(function ($room) use ($offer, $nights) {
            $room->charge = ReservationService::totalCalculation($room->price, $nights, $offer);
            return $room;
        });

        return Inertia::render('Reservation/Reservation', [
            'rooms' => RoomResource::collection($rooms),
            'nights' => $nights,
            'filters' => [
                'start_date' => $start_date->format('Y-m-d'),
                'end_date' => $end_date->format('Y-m-d'),
                'adults' => $request->adults,
                'kids' => $request->kids
            ]
        ]);
    }
    public function searchReservation()
    {
        return Inertia::render('SearchReservation/SearchReservation');
    }

    public function createReservation(UserCheckoutRequest $request)
    {
        $charge = session('charge');
        $reservation = new Reservation(session('reservation'));
        $reservation->code = fake()->bothify('########');
        $reservation->price = $charge['pricePerNight'];
        $reservation->nights = $charge['nights'];
        $reservation->sub_total = $charge['subTotal'];
        $reservation->tax_percent = $charge['taxPercent'];
        $reservation->tax_amount = $charge['taxAmount'];
        $reservation->total = $charge['total'];
        $reservation->offer = $charge['offer'];
        $reservation->payment_status = PaymentStatus::UNPAID;
        $reservation->data = [
            'room' => session('room'),
            'user' => [
                'email' => auth()->user()->email,
                ...$request->safe()->except(['note'])
            ],
        ];
        $reservation->special_request = $request->note;
        $reservation->room_id = session('room')['id'];
        $reservation->user_id = auth()->user()->id;
        $reservation->save();

        // Calcular montos para depósito y pago restante
        $depositAmount = round($reservation->total * 0.3, 2);
        $remainingAmount = round($reservation->total * 0.7, 2);

        // Actualizar los campos de depósito y monto restante
        $reservation->deposit_amount = $depositAmount;
        $reservation->remaining_amount = $remainingAmount;
        $reservation->save();

        // Redireccionar al flujo de pago en lugar de ir directamente al perfil
        return redirect()->route('payment.options', ['code' => $reservation->code])
            ->with('checkoutSuccess', 'Reservación creada con éxito. Por favor, complete el pago.');
    }

    public function detailsReservation(Request $request)
    {
        $request->validate([
            'code' => 'required|exists:reservations|max:255',
        ], [
            'code.exists' => 'Numero de reservación no encontrado'
        ]);

        $reservation = Reservation::where('code', $request->code)->first();

        // $markdown = new Markdown(view(), config('mail.markdown'));
        // return $markdown->render('mail.orders.shipped', compact('reservation'));

        return Inertia::render('DetailsOrder/DetailsOrder', [
            'reservation' => $reservation,
        ]);
    }
}
