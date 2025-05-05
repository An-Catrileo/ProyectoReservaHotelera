import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PaymentLayout from '@/Layouts/PaymentLayout';
import { formatCurrency, formatDate } from '@/Helpers/helper';
import Card from '@/Components/Card';
import SuccessIcon from '@/Components/Icons/SuccessIcon';

export default function PaymentConfirmation({ auth, reservation, payments }) {
  const lastPayment = payments[payments.length - 1];
  const isPartialPayment = reservation.payment_status === 'partially_paid';

  return (
    <PaymentLayout 
      title="Confirmación de Pago" 
      breadcrumb={[
        {
          title: "Reservacion: #" + reservation.code,
          path: route('profile.reservation', { code: reservation.code })
        },
        {
          title: "Confirmación de Pago",
        },
      ]}
    >
      <Head title="Confirmación de Pago" />

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <SuccessIcon className="w-16 h-16 text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">¡Pago realizado con éxito!</h1>
            <p className="text-lg text-gray-600 mb-6">
              {isPartialPayment 
                ? 'Hemos recibido su pago inicial. Puede completar el pago restante más adelante.' 
                : 'Su reserva ha sido pagada completamente.'}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-4 text-left">Detalles del pago</h2>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="mb-3">
                  <p className="text-gray-600">Número de reserva</p>
                  <p className="font-medium">{reservation.code}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">Fecha de pago</p>
                  <p className="font-medium">{formatDate(lastPayment.created_at)}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">Método de pago</p>
                  <p className="font-medium">{
                    lastPayment.payment_method === 'credit_card' ? 'Tarjeta de crédito' :
                    lastPayment.payment_method === 'debit_card' ? 'Tarjeta de débito' : 'PayPal'
                  }</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">Monto pagado</p>
                  <p className="font-medium">{formatCurrency(lastPayment.amount)}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">Estado de la reserva</p>
                  <p className="font-medium">{
                    isPartialPayment ? 'Pagado parcialmente (30%)' : 'Pagado completamente'
                  }</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600">ID de transacción</p>
                  <p className="font-medium">{lastPayment.transaction_id}</p>
                </div>
              </div>
            </div>

            {isPartialPayment && (
              <div className="bg-yellow-50 p-6 rounded-lg mb-6 text-left">
                <h3 className="text-lg font-semibold mb-2">Pago pendiente</h3>
                <p className="mb-2">Monto restante: <span className="font-medium">{formatCurrency(reservation.remaining_amount)}</span></p>
                <p className="text-sm text-gray-600 mb-4">
                  Recuerde que debe completar el pago restante antes de su llegada.
                </p>
                <Link 
                  href={route('payment.remaining', { code: reservation.code })}
                  className="text-primary-600 font-medium hover:underline"
                >
                  Completar pago pendiente →
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Link 
                href={route('profile.reservation', { code: reservation.code })}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 text-center"
              >
                Ver detalles de la reserva
              </Link>
              
              <Link 
                href={route('profile.reservations')}
                className="border border-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50 text-center"
              >
                Mis reservas
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </PaymentLayout>
  );
} 