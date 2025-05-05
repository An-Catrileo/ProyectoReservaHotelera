import Layout from '@/Layouts/Layout'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import HeroImage from './HeroImage'
import HomeSectionRooms from './HomeSectionRooms'
import HomeServices from './HomeServices'
import HomeSectionPhotos from './HomeSectionPhotos'
import HomeSectionRoomPrice from './HomeSectionRoomPrice'
import SectionContact from '@/Components/Section/SectionContact'


const Home = ({ page }) => {
    // Valores por defecto en caso de que page sea null
    const pageTitle = page?.title || 'Hotel Laravel';
    const pageDescription = page?.description || 'Bienvenido a nuestro hotel';

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
                <meta head-key="description" name="description" content={pageDescription} />
            </Head>

            <HeroImage />

            <HomeSectionRooms />

            <div className='bg-primary'>
                <HomeServices />
            </div>

            <HomeSectionPhotos />

            <div className='bg-primary'>
                <HomeSectionRoomPrice />
            </div>

            <SectionContact />

        </Layout>
    )
}

export default Home
