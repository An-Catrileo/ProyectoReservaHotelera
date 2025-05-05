<?php

namespace App\Http\Controllers;

use App\Http\Resources\BedResource;
use App\Http\Resources\OfferResource;
use App\Http\Resources\RoomResource;
use App\Models\Gallery;
use App\Models\Offer;
use App\Models\Page;
use App\Models\Room;
use App\Services\OfferService;
use App\Services\ReservationService;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        $page = Page::where('type', 'home')->first();

        $rooms = Room::select('id', 'slug', 'name', 'thumb', 'entry', 'adults', 'price', 'home')
            ->with('beds')
            ->where('active', 1)
            ->get();

        $cheap_rooms = $rooms->sortBy('price')->first();

        $rooms_home = $rooms->where('home', true);

        $offers = Offer::select('nights', 'percent')->limit(2)->get();


        return Inertia::render('Home/Home', [
            'page' => $page,
            'rooms' => RoomResource::collection($rooms_home),
            'offers' => OfferResource::collection($offers),
            'cheapRoom' => new RoomResource($cheap_rooms),
        ]);
    }
    public function about()
    {
        $page = Page::where('type', 'about')->first();

        $rooms = Room::select('id', 'name', 'price', 'slug',  'thumb', 'entry', 'adults',  'about')
            ->with('beds')
            ->where('active', 1)
            ->where('about', true)
            ->get();

        return Inertia::render('About/About', [
            'page' => $page,
            'rooms' => RoomResource::collection($rooms),
        ]);
    }
    public function contact()
    {
        $page = Page::where('type', 'contact')->first();

        return Inertia::render('Contact/Contact', [
            'page' => $page,

        ]);
    }
    public function rooms()
    {
        $page = Page::where('type', 'rooms')->first();

        $nights = 7;

        $offer = OfferService::findOffer($nights);

        $rooms = Room::select('id', 'name', 'slug', 'thumb', 'entry', 'adults', 'price')
            ->with('beds', 'amenities')
            ->where('active', 1)
            // ->inRandomOrder()
            ->get()->map(function ($room) use ($offer, $nights) {

                return [
                    'id' => $room->id,
                    'name' => $room->name,
                    'slug' => $room->slug,
                    'thumb' => $room->thumb,
                    'entry' => $room->entry,
                    'adults' => $room->adults,
                    'price' => $room->price,
                    'beds' => BedResource::collection($room->beds),
                    'amenities' => $room->amenities,
                    'nights' => $nights,
                    'charge' => ReservationService::totalCalculation($room->price, $nights, $offer)
                ];
            });

        return Inertia::render('Rooms/Rooms', [
            'page' => $page,
            'rooms' => $rooms,
        ]);
    }
    public function room($slug)
    {
        $room = Room::with('beds', 'images', 'amenities')
            ->where('slug', $slug)
            ->where('active', 1)
            ->firstOrFail();

        $nights = 7;
        $offer = OfferService::findOffer($nights);
        $charge = ReservationService::totalCalculation($room->price, $nights, $offer);


        $recommendedRooms = Room::with('beds')
            ->inRandomOrder()->limit(3)
            ->where('active', 1)
            ->whereNot('slug', $slug)->get();


        $offers = Offer::select('nights', 'percent')->limit(2)->get();

        return Inertia::render('RoomSingle/RoomSingle', [
            'room' => new RoomResource($room),
            'charge' => $charge,
            'offers' => OfferResource::collection($offers),
            'recommendedRooms' => RoomResource::collection($recommendedRooms),
        ]);
    }
    public function gallery()
    {
        $page = Page::where('type', 'gallery')->firstOrFail();
        $galleries = Gallery::with('images')->get();

        return Inertia::render('Gallery/Gallery', [
            'page' => $page,
            'galleries' => $galleries

        ]);
    }
    public function legalPolicies()
    {
        $page = Page::where('type', 'legal-policies')->first();
        return Inertia::render('LegalPolicies/LegalPolicies', [
            'page' => $page
        ]);
    }
}
