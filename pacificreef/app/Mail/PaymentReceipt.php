<?php

namespace App\Mail;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentReceipt extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   */
  public function __construct(
    public Reservation $reservation,
    public Payment $payment
  ) {
    //
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    $user = $this->reservation->user;
    $paymentType = $this->payment->type === 'deposit' ? 'Pago de Depósito' : 'Pago Restante';

    return new Envelope(
      from: new Address(config('mail.from.address'), config('mail.from.name')),
      subject: "Comprobante de Pago - Reserva #{$this->reservation->code}",
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      markdown: 'mail.payment.receipt',
      with: [
        'reservation' => $this->reservation,
        'payment' => $this->payment,
      ],
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
