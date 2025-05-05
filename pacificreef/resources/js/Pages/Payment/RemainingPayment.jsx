import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PaymentLayout from '@/Layouts/PaymentLayout';
import { formatCurrency } from '@/Helpers/helper';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import Radio from '@/Components/Radio';

export default function RemainingPayment({ auth, reservation, remainingAmount }) {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const { post, processing, setData, data } = useForm({
    paymentType: 'remaining',
    paymentMethod: 'credit_card',
  });

  const handleChange = (value) => {
    setPaymentMethod(value);
    setData('paymentMethod', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('payment.process', { code: reservation.code }));
  };

  return (
    <PaymentLayout 
      title="Completar Pago Restante" 
      breadcrumb={[
        {
          title: "Reservacion: #" + reservation.code,
          path: route('profile.reservation', { code: reservation.code })
        },
        {
          title: "Completar Pago",
        },
      ]}
    >
      <Head title="Completar Pago" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <Radio 
                      id="payment_method_credit"
                      name="payment_method" 
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => handleChange('credit_card')}
                    />
                    <label htmlFor="payment_method_credit" className="ml-2">
                      <span className="font-medium">Tarjeta de crédito</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <Radio 
                      id="payment_method_debit"
                      name="payment_method" 
                      value="debit_card"
                      checked={paymentMethod === 'debit_card'}
                      onChange={() => handleChange('debit_card')}
                    />
                    <label htmlFor="payment_method_debit" className="ml-2">
                      <span className="font-medium">Tarjeta de débito</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <Radio 
                      id="payment_method_paypal"
                      name="payment_method" 
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handleChange('paypal')}
                    />
                    <label htmlFor="payment_method_paypal" className="ml-2">
                      <span className="font-medium">PayPal</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-8">
              <PrimaryButton type="submit" className="w-full py-3" disabled={processing}>
                {processing ? 'Procesando...' : 'Completar Pago'}
              </PrimaryButton>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-5">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="mb-6">
              <p className="mb-2">Reserva: <span className="font-medium">{reservation.code}</span></p>
              <p className="mb-2">Habitación: <span className="font-medium">{reservation.data.room.name}</span></p>
              <p className="mb-4">Fechas: <span className="font-medium">{new Date(reservation.start_date).toLocaleDateString('es-ES')} - {new Date(reservation.end_date).toLocaleDateString('es-ES')}</span></p>
              
              <div className="p-4 bg-yellow-50 rounded-lg mt-4">
                <p className="font-semibold text-yellow-800">
                  Esta reserva tiene un pago parcial pendiente
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Total de la reserva:</span>
                <span>{formatCurrency(reservation.total)}</span>
              </div>
              
              <div className="flex justify-between mb-2 text-green-600">
                <span>Depósito pagado (30%):</span>
                <span>{formatCurrency(reservation.deposit_amount)}</span>
              </div>
              
              <div className="flex justify-between mt-4 pt-4 border-t font-bold text-lg text-primary-600">
                <span>Monto pendiente a pagar:</span>
                <span>{formatCurrency(remainingAmount)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PaymentLayout>
  );
} 