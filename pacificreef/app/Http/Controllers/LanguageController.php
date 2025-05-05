<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\App;

class LanguageController extends Controller
{
  /**
   * Cambia el idioma de la aplicación y lo guarda en la sesión
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  string  $locale
   * @return \Illuminate\Http\Response
   */
  public function switchLang(Request $request, $locale)
  {
    // Verificar que el idioma sea válido (solo permitimos 'es' y 'en')
    if (in_array($locale, ['es', 'en'])) {
      // Establecer la sesión
      $request->session()->put('locale', $locale);

      // Establecer el locale para la petición actual
      App::setLocale($locale);
    }

    return redirect()->back();
  }
}
