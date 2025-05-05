import { formatCurrency, formatDate } from '@/Helpers/helper'
import React from 'react'
import DetailsDescription from './DetailsDescription'
import Card from './Card'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/Utils/i18n'

const DetailsReservation = ({ reservation }) => {
    // Verificar el estado de pago
    const isUnpaid = reservation.payment_status === 'unpaid';
    const isPartiallyPaid = reservation.payment_status === 'partially_paid';
    const isPaid = reservation.payment_status === 'paid';
    const __ = useTranslation();
    
    // Definir colores según el estado de pago
    const paymentStatusColor = isUnpaid ? 'red' : (isPartiallyPaid ? 'yellow' : 'green');
    const paymentStatusText = isUnpaid 
        ? __('reservation_details.unpaid') 
        : (isPartiallyPaid 
            ? __('reservation_details.partially_paid') 
            : __('reservation_details.fully_paid'));
    
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h4 className='text-lg font-medium'>{__('reservation_details.title')}</h4>
                    <Card className="py-4 px-4 md:px-6 mt-2">
                        <dl className='divide-y'>
                            <DetailsDescription title={__('reservation_details.order_number')}>
                                {reservation.code}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.date')}>
                                {formatDate(reservation.created_at)}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.total')}>
                                {formatCurrency(reservation.total)}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.payment_status')}>
                                <span className={`text-${paymentStatusColor}-600 font-medium`}>
                                    {paymentStatusText}
                                </span>
                            </DetailsDescription>
                        </dl>
                        
                        {/* Mostrar botones de pago según el estado */}
                        {(isUnpaid || isPartiallyPaid) && (
                            <div className="mt-4 pt-4 border-t">
                                <h5 className="font-medium mb-2">{__('reservation_details.payment_options')}</h5>
                                {isUnpaid && (
                                    <Link 
                                        href={route('payment.options', { code: reservation.code })}
                                        className="block w-full bg-primary-600 text-white py-2 px-4 rounded text-center hover:bg-primary-700"
                                    >
                                        {__('reservation_details.make_payment')}
                                    </Link>
                                )}
                                {isPartiallyPaid && (
                                    <Link 
                                        href={route('payment.remaining', { code: reservation.code })}
                                        className="block w-full bg-primary-600 text-white py-2 px-4 rounded text-center hover:bg-primary-700"
                                    >
                                        {__('reservation_details.complete_payment')} ({formatCurrency(reservation.remaining_amount)})
                                    </Link>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
                <div>
                    <h4 className='text-lg font-medium'>{__('reservation_details.guest_info')}</h4>
                    <Card className="px-4 md:px-6 py-4 mt-2">
                        <dl className='divide-y mt-2'>
                            <DetailsDescription title={__('reservation_details.name')}>
                                {reservation.data.user.name}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.email')}>
                                {reservation.data.user.email}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.phone')}>
                                {reservation.data.user.phone}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.country')}>
                                {reservation.data.user.country}
                            </DetailsDescription>
                            <DetailsDescription title={__('reservation_details.city')}>
                                {reservation.data.user.city}
                            </DetailsDescription>
                            {reservation.special_request && (
                                <DetailsDescription title={__('reservation_details.additional_info')}>
                                    <p className='font-normal'>
                                        {reservation.special_request}
                                    </p>
                                </DetailsDescription>
                            )}
                        </dl>
                    </Card>
                </div>
            </div>
            <div className='mt-5'>
                <h4 className='text-lg font-medium'>{__('reservation_details.room_details')}</h4>

                <Card className="px-4 md:px-6 py-6 mt-2">
                    <div className="overflow-x-auto">
                        <table className='w-full table-list min-w-full'>
                            <thead>
                                <tr>
                                    <th className='font-medium text-left'>{__('reservation_details.product')}</th>
                                    <th className='text-right font-medium'>{__('reservation_details.total')}</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y border-t'>
                                <tr>
                                    <td className='align-baseline'>
                                        {__('reservation_details.room')}:
                                    </td>
                                    <td className='text-right'>
                                        {reservation.data.room.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{__('reservation_details.adults')}</td>
                                    <td className='text-right'>
                                        {reservation.adults}
                                    </td>
                                </tr>
                                {reservation.kids > 0 && (
                                    <tr>
                                        <td>{__('reservation_details.children')}</td>
                                        <td className='text-right'>
                                            {reservation.kids}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>{__('reservation_details.check_in_date')}</td>
                                    <td className='text-right'>
                                        {formatDate(reservation.start_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{__('reservation_details.check_out_date')}</td>
                                    <td className='text-right'>
                                        {formatDate(reservation.end_date)}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        {__('reservation_details.price_per_night')}:
                                    </td>
                                    <td className='text-right'>
                                        {formatCurrency(reservation.price)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {__('reservation_details.price_for_nights', {nights: reservation.nights})}:
                                    </td>
                                    <td className='text-right'>
                                        {formatCurrency(reservation.sub_total)}
                                    </td>
                                </tr>


                                {reservation.offer && (
                                    <tr>
                                        <td>
                                            {__('reservation_details.offer', {percent: reservation.offer.percent})}
                                        </td>
                                        <td className='text-red-500 text-right'>
                                            - {formatCurrency(reservation.offer.offerAmount)}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>
                                        {__('reservation_details.subtotal')}
                                    </td>
                                    <td className='text-right'>
                                        {formatCurrency(reservation.sub_total)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-4'>
                                        {__('reservation_details.tax', {percent: reservation.tax_percent})}
                                    </td>
                                    <td className='text-right'>
                                        {formatCurrency(reservation.tax_amount)}
                                    </td>
                                </tr>
                                <tr className='font-bold'>
                                    <td>
                                        {__('reservation_details.total')}
                                    </td>
                                    <td className='text-right'>
                                        {formatCurrency(reservation.total)}
                                    </td>
                                </tr>
                                
                                {/* Mostrar información de pagos según el estado */}
                                {isPartiallyPaid && (
                                    <>
                                        <tr>
                                            <td>{__('reservation_details.deposit_paid')}</td>
                                            <td className="text-green-600 text-right">{formatCurrency(reservation.deposit_amount)}</td>
                                        </tr>
                                        <tr>
                                            <td>{__('reservation_details.amount_pending')}</td>
                                            <td className="text-yellow-600 text-right">{formatCurrency(reservation.remaining_amount)}</td>
                                        </tr>
                                    </>
                                )}
                                {isPaid && (
                                    <tr>
                                        <td colSpan="2" className="text-center py-2 text-green-600">
                                            {__('reservation_details.fully_paid_message')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DetailsReservation
