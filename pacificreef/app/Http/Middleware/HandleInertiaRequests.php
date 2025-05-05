<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Establecer el idioma desde la sesión si existe
        if ($request->session()->has('locale')) {
            App::setLocale($request->session()->get('locale'));
        }

        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? new UserResource($request->user()) : null,
            ],
            'flash' => [
                'orderSuccess' => fn() => $request->session()->get('orderSuccess'),
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'locale' => App::getLocale(),
            'translations' => [
                'es' => trans('app', [], 'es'),
                'en' => trans('app', [], 'en'),
            ],
        ];
    }
}
