import Breadcrumb from '@/Components/Breadcrumb'
import Layout from '@/Layouts/Layout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

import CardRoomOffer from '@/Components/Card/CardRoomOffer'
import { ArrowLongRightIcon } from '@heroicons/react/16/solid'

const Rooms = ({ page, rooms, nights }) => {
    const breadcrumb = [
        {
            title: 'Habitaciones'
        },
    ]

    // Valores por defecto en caso de que page sea null
    const pageTitle = page?.title || 'Habitaciones';
    const pageDescription = page?.description || 'Nuestras habitaciones';

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
                <meta head-key="description" name="description" content={page?.description || ''} />
            </Head>

            <Breadcrumb data={breadcrumb} />

            <section className='py-section'>
                <div className='container'>
                    <div className='space-y-10'>
                        {rooms.map((room) => (
                            <CardRoomOffer key={room.slug} room={room} >
                                <div className=' text-primary-700 flex items-end justify-end hover:scale-110 transition-transform transform duration-300 '>
                                    <Link href={route('room', { slug: room.slug })} className='font-semibold '>Ver Detalles</Link>
                                    <ArrowLongRightIcon className='w-4 h-4 ml-3' />
                                </div>
                            </CardRoomOffer>
                        ))}
                    </div>
                </div>
            </section>

        </Layout >

    )
}

export default Rooms
