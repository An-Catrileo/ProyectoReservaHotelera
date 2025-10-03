@component('mail::message')

# Comprobante de Pago

¡Hola {{ $reservation->data->user->name ?? $reservation->user->name }}!

Tu pago ha sido procesado exitosamente. A continuación, encontrarás los detalles de tu transacción.

## Información del Pago

@component('mail::panel')
**ID de Transacción:** {{ $payment->transaction_id }}
**Fecha del Pago:** {{ \Carbon\Carbon::parse($payment->created_at)->isoFormat('DD MMM YYYY HH:mm') }}
**Método de Pago:** {{ ucfirst(str_replace('_', ' ', $payment->payment_method)) }}
**Monto Pagado:** @money($payment->amount)
**Tipo de Pago:** {{ $payment->type === 'deposit' ? 'Depósito (30%)' : 'Pago Restante (70%)' }}
**Estado:** {{ $payment->status === 'completed' ? 'Completado' : 'Pendiente' }}
@endcomponent

## Detalles de la Reserva

**Código de Reserva:** {{ $reservation->code }}
**Habitación:** {{ $reservation->data->room->name ?? 'N/A' }}
**Adultos:** {{ $reservation->adults }} {{ $reservation->kids > 0 ? '| Niños: ' . $reservation->kids : '' }}
**Noches:** {{ $reservation->nights }}
**Fecha llegada:** {{ $reservation->start_date->isoFormat('DD MMM YYYY') }}
**Fecha Salida:** {{ $reservation->end_date->isoFormat('DD MMM YYYY') }}

---

## Resumen de Costos

**Precio por noche:** @money($reservation->price)
**Precio por {{ $reservation->nights }} noche(s):** @money($reservation->sub_total)
@if ($reservation->offer)
**Oferta ({{ $reservation->offer->percent }}%):** - @money($reservation->offer->offerAmount)
**Sub total con oferta:** @money($reservation->offer->priceTotalOffer)
@endif
**IVA ({{ $reservation->tax_percent }}%):** @money($reservation->tax_amount)

### Total de la Reserva: @money($reservation->total)

---

## Estado de Pago

@component('mail::panel')
**Pagado hasta ahora:** @money($reservation->payments->sum('amount'))
@if($reservation->payment_status !== 'paid')
**Saldo Pendiente:** @money($reservation->remaining_amount)
@endif
**Estado:** {{ $reservation->payment_status === 'paid' ? '✓ PAGADO COMPLETAMENTE' : ($reservation->payment_status === 'partially_paid' ? 'PAGO PARCIAL' : 'PENDIENTE') }}
@endcomponent

@if($reservation->payment_status !== 'paid')
@component('mail::button', ['url' => route('payment.remaining', $reservation->code)])
Completar Pago
@endcomponent
@endif

@if($reservation->special_request)
**Solicitudes Especiales:**
{{ $reservation->special_request }}
@endif

Gracias por preferirnos. Si tienes alguna pregunta sobre este pago o tu reserva, no dudes en contactarnos.

Nos vemos pronto,
{{ config('app.name') }}

@endcomponent