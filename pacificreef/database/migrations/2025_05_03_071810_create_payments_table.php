<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('payments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('reservation_id')->constrained()->cascadeOnDelete();
      $table->string('transaction_id')->nullable();
      $table->decimal('amount', 10, 2);
      $table->enum('type', ['deposit', 'remaining'])->default('deposit');
      $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
      $table->enum('payment_method', ['credit_card', 'debit_card', 'paypal'])->default('credit_card');
      $table->json('payment_details')->nullable();
      $table->timestamps();
    });

    // Agregar campos para el estado del pago en la tabla reservations
    Schema::table('reservations', function (Blueprint $table) {
      $table->enum('payment_status', ['unpaid', 'partially_paid', 'paid'])->default('unpaid')->after('state');
      $table->decimal('deposit_amount', 10, 2)->nullable()->after('total');
      $table->decimal('remaining_amount', 10, 2)->nullable()->after('deposit_amount');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('payments');

    Schema::table('reservations', function (Blueprint $table) {
      $table->dropColumn(['payment_status', 'deposit_amount', 'remaining_amount']);
    });
  }
};
