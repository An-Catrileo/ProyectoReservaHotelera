<?php

namespace App\Enums;

enum PaymentStatus: string
{
  case UNPAID = 'unpaid';
  case PARTIALLY_PAID = 'partially_paid';
  case PAID = 'paid';

  public function text(): string
  {
    return match ($this) {
      PaymentStatus::UNPAID => 'Sin pagar',
      PaymentStatus::PARTIALLY_PAID => 'Pago parcial (30%)',
      PaymentStatus::PAID => 'Pagado completamente',
    };
  }

  public function color(): string
  {
    return match ($this) {
      PaymentStatus::UNPAID => 'red',
      PaymentStatus::PARTIALLY_PAID => 'yellow',
      PaymentStatus::PAID => 'green',
    };
  }

  public function icon(): string
  {
    return match ($this) {
      PaymentStatus::UNPAID => 'heroicon-s-x-circle',
      PaymentStatus::PARTIALLY_PAID => 'heroicon-s-clock',
      PaymentStatus::PAID => 'heroicon-s-check-circle',
    };
  }
}
