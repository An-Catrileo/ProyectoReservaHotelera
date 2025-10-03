<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Mail\PaymentReceipt;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentController extends Controller
{
  public function showPaymentOptions($code)
  {
    $reservation = Reservation::where('code', $code)->firstOrFail();

    // Si ya está pagado completamente, redirigir a los detalles
    if ($reservation->payment_status === PaymentStatus::PAID) {
      return redirect()->route('profile.reservation', ['code' => $reservation->code])
        ->with('message', 'Esta reserva ya ha sido pagada completamente.');
    }

    // Calcular los montos de depósito (30%) y total
    $depositAmount = round($reservation->total * 0.3, 2);
    $remainingAmount = round($reservation->total * 0.7, 2);

    // Actualizar los campos en la reserva si aún no están establecidos
    if (!$reservation->deposit_amount) {
      $reservation->deposit_amount = $depositAmount;
      $reservation->remaining_amount = $remainingAmount;
      $reservation->save();
    }

    return Inertia::render('Payment/PaymentOptions', [
      'reservation' => $reservation,
      'depositAmount' => $depositAmount,
      'remainingAmount' => $remainingAmount,
    ]);
  }

  public function processPayment(Request $request, $code)
  {
    $request->validate([
      'paymentType' => 'required|in:deposit,full,remaining',
      'paymentMethod' => 'required|in:credit_card,debit_card,paypal',
      // Aquí puedes agregar más validaciones para detalles de pago
    ]);

    $reservation = Reservation::where('code', $code)->firstOrFail();

    // Verificar si ya está pagado
    if ($reservation->payment_status === PaymentStatus::PAID) {
      return redirect()->route('profile.reservation', ['code' => $reservation->code])
        ->with('message', 'Esta reserva ya ha sido pagada completamente.');
    }

    // Calcular el monto a pagar basado en el tipo de pago
    if ($request->paymentType === 'deposit') {
      $amount = $reservation->deposit_amount;
      $paymentType = 'deposit';
    } elseif ($request->paymentType === 'remaining') {
      $amount = $reservation->remaining_amount;
      $paymentType = 'remaining';
    } else { // 'full'
      $amount = $reservation->total;
      $paymentType = 'deposit'; // Para pagos completos, usamos 'deposit' como tipo en la BD
    }

    // En un sistema real, aquí se procesaría el pago con la pasarela elegida
    // Simulemos una transacción exitosa
    $transactionId = 'TX-' . strtoupper(substr(md5(uniqid()), 0, 10));

    // Crear registro de pago
    $payment = new Payment();
    $payment->reservation_id = $reservation->id;
    $payment->transaction_id = $transactionId;
    $payment->amount = $amount;
    $payment->type = $paymentType; // Usamos la variable $paymentType que solo tiene valores permitidos
    $payment->status = 'completed'; // En un sistema real, dependería de la respuesta de la pasarela
    $payment->payment_method = $request->paymentMethod;
    $payment->payment_details = [
      'date' => now()->format('Y-m-d H:i:s'),
      'user_id' => auth()->id(),
      // Más detalles aquí
    ];
    $payment->save();

    // Actualizar el estado de pago de la reserva
    if ($request->paymentType === 'full' || $request->paymentType === 'remaining' || $reservation->payment_status === PaymentStatus::PARTIALLY_PAID) {
      $reservation->payment_status = PaymentStatus::PAID;
    } else {
      $reservation->payment_status = PaymentStatus::PARTIALLY_PAID;
    }
    $reservation->save();

    // Recargar la reserva con las relaciones necesarias
    $reservation->load(['payments', 'user']);

    // Enviar correo electrónico con el comprobante de pago
    try {
      $userEmail = $reservation->user->email ?? $reservation->data->user->email ?? null;

      if ($userEmail) {
        Mail::to($userEmail)->send(new PaymentReceipt($reservation, $payment));
      }
    } catch (\Exception $e) {
      // Log del error pero no interrumpir el flujo
      Log::error('Error al enviar correo de comprobante de pago: ' . $e->getMessage());
    }

    // Redireccionar al usuario a la página de confirmación
    return redirect()->route('payment.confirmation', ['code' => $reservation->code])
      ->with('success', 'Pago procesado exitosamente. Se ha enviado un comprobante a tu correo electrónico.');
  }

  public function showConfirmation($code)
  {
    $reservation = Reservation::where('code', $code)->with('payments')->firstOrFail();

    return Inertia::render('Payment/PaymentConfirmation', [
      'reservation' => $reservation,
      'payments' => $reservation->payments,
    ]);
  }

  public function showRemainingPayment($code)
  {
    $reservation = Reservation::where('code', $code)->firstOrFail();

    // Verificar si es elegible para pago restante
    if ($reservation->payment_status !== PaymentStatus::PARTIALLY_PAID) {
      return redirect()->route('profile.reservation', ['code' => $reservation->code])
        ->with('message', 'Esta reserva no es elegible para pago restante.');
    }

    return Inertia::render('Payment/RemainingPayment', [
      'reservation' => $reservation,
      'remainingAmount' => $reservation->remaining_amount,
    ]);
  }
}
