import Card from '@/Components/Card'
import DetailReservation from '@/Components/DetailsReservation'
import DetailsDescription from '@/Components/DetailsDescription'
import { formatCurrency, formatDate } from '@/Helpers/helper'
import LayoutProfile from '@/Layouts/LayoutProfile'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import DetailsReservation from '@/Components/DetailsReservation'
import { CheckCircle2Icon } from 'lucide-react'
import { useTranslation } from '@/Utils/i18n'

const ReservationDetails = ({ reservation }) => {
    const { flash } = usePage().props
    const __ = useTranslation();
    
    return (
        <LayoutProfile breadcrumb={[
            {
                title: __('profile.reservation_details') + ": #" + reservation.code,
            },
        ]}>
            <Head title={__('profile.reservation_details')} />
            {flash.orderSuccess && (
                <div>
                    <div className="bg-green-100 p-2 md:p-4 flex items-start space-x-2 rounded-lg border border-green-400 mb-4">
                        <div>
                            <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-green-700 flex-grow">
                            <span className="font-semibold block text-green-600">
                                {__('messages.thank_you')}. {__('reservation_details.reservation_created')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <DetailsReservation reservation={reservation} />
        </LayoutProfile >
    )
}

export default ReservationDetails
