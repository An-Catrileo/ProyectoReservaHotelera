import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PaymentLayout from '@/Layouts/PaymentLayout';
import { formatCurrency } from '@/Helpers/helper';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import Radio from '@/Components/Radio';

export default function PaymentOptions({ auth, reservation, depositAmount, remainingAmount }) {
  const [paymentType, setPaymentType] = useState('deposit');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const { post, processing, setData } = useForm({
    paymentType: 'deposit',
    paymentMethod: 'credit_card',
  });

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    setData('paymentType', value);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setData('paymentMethod', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('payment.process', { code: reservation.code }));
  };

  return (
    <PaymentLayout 
      title="Opciones de Pago" 
      breadcrumb={[
        {
          title: "Reservacion: #" + reservation.code,
          path: route('profile.reservation', { code: reservation.code })
        },
        {
          title: "Opciones de Pago",
        },
      ]}
    >
      <Head title="Opciones de Pago" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seleccione un método de pago</h2>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <Radio 
                      id="payment_type_deposit"
                      name="payment_type" 
                      value="deposit"
                      checked={paymentType === 'deposit'}
                      onChange={() => handlePaymentTypeChange('deposit')}
                    />
                    <label htmlFor="payment_type_deposit" className="ml-2">
                      <span className="font-medium">Pago inicial (30%)</span>
                      <p className="text-gray-600">Pagar {formatCurrency(depositAmount)} ahora y el resto ({formatCurrency(remainingAmount)}) después</p>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <Radio 
                      id="payment_type_full"
                      name="payment_type" 
                      value="full"
                      checked={paymentType === 'full'}
                      onChange={() => handlePaymentTypeChange('full')}
                    />
                    <label htmlFor="payment_type_full" className="ml-2">
                      <span className="font-medium">Pago completo</span>
                      <p className="text-gray-600">Pagar el monto total: {formatCurrency(reservation.total)}</p>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

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
                      onChange={() => handlePaymentMethodChange('credit_card')}
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
                      onChange={() => handlePaymentMethodChange('debit_card')}
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
                      onChange={() => handlePaymentMethodChange('paypal')}
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
                {processing ? 'Procesando...' : 'Proceder al Pago'}
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
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(reservation.sub_total)}</span>
              </div>
              
              {reservation.offer && (
                <div className="flex justify-between mb-2 text-red-500">
                  <span>Descuento ({reservation.offer.percent}%):</span>
                  <span>-{formatCurrency(reservation.offer.offerAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between mb-2">
                <span>IVA ({reservation.tax_percent}%):</span>
                <span>{formatCurrency(reservation.tax_amount)}</span>
              </div>
              
              <div className="flex justify-between mt-4 pt-4 border-t font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(reservation.total)}</span>
              </div>
              
              <div className="flex justify-between mt-4 pt-4 border-t font-bold text-lg text-primary-600">
                <span>Total a pagar ahora:</span>
                <span>{formatCurrency(paymentType === 'deposit' ? depositAmount : reservation.total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PaymentLayout>
  );
} 