import CardOffer from '@/Components/CardOffer'
import CardRoom from '@/Components/CardRoom'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TitleSectionLink from '@/Components/TitleSectionLink'
import { ArrowLongRightIcon } from '@heroicons/react/16/solid'
import { UserIcon } from '@heroicons/react/24/outline'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const HomeSectionRooms = () => {
    const { rooms } = usePage().props || {}
    
    return (
        <section className='py-section '>
            <div className='container'>
                <TitleSectionLink title="Habitaciones" titleLink="Ver todas las habitaciones" urlLink={route('rooms')} />

                <div className='mt-12'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
                        {rooms && rooms.length > 0 ? (
                            rooms.map((room, index) => (
                                <CardRoom key={index} room={room} />
                            ))
                        ) : (
                            <div className="col-span-full text-center">
                                <p className="text-lg text-gray-600">No hay habitaciones disponibles actualmente.</p>
                            </div>
                        )}

                        <CardOffer />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeSectionRooms
