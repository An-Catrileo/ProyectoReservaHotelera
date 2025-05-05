import InfoIconItem from '@/Components/InfoIconItem'
import TitleSection from '@/Components/TitleSection'
import { CalendarDaysIcon, ClipboardDocumentCheckIcon, KeyIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from '@/Utils/i18n'

const StagesBooking = () => {
    const __ = useTranslation();

    return (
        <section className='py-section'>
            <div className='container'>
                <div className='grid lg:grid-cols-2 gap-10 lg:gap-20'>
                    <div className='flex items-center lg:max-w-2xl'>
                        <div >
                            <TitleSection>
                                {__('booking_stages.title')}
                            </TitleSection>
                            <div className='mt-7 space-y-8'>
                                <InfoIconItem Icon={CalendarDaysIcon} title={__('booking_stages.room_reservation')}>
                                    {__('booking_stages.room_reservation_desc')}
                                </InfoIconItem>
                                <InfoIconItem Icon={ClipboardDocumentCheckIcon} title={__('booking_stages.documents_payment')}>
                                    {__('booking_stages.documents_payment_desc')}
                                </InfoIconItem>
                                <InfoIconItem Icon={KeyIcon} title={__('booking_stages.check_in')}>
                                    {__('booking_stages.check_in_desc')}
                                </InfoIconItem>
                            </div>
                        </div>
                    </div>
                    <div className='relative  sm:px-10 lg:px-0'>
                        <img src='/img/hotel-reception.jpg' className='w-full rounded-lg lg:h-[600px] object-cover object-center' alt="" />
                    </div>
                </div>


            </div>
        </section>
    )
}



export default StagesBooking
