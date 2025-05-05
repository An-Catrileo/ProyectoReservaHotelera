import Breadcrumb from '@/Components/Breadcrumb'
import Layout from '@/Layouts/Layout'
import { Head } from '@inertiajs/react'
import React from 'react'
import BenefitsHeader from './BenefitsHeader'
import BenefitsList from './BenefitsList'
import Rooms from './Rooms'
import StagesBooking from './StagesBooking'
import RuleReservation from './RuleReservation'
import FrequentlyAsked from './FrequentlyAsked'

const About = ({ page, rooms }) => {
    // Valores por defecto en caso de que page sea null
    const pageTitle = page?.title || 'Sobre Nosotros';
    const pageDescription = page?.description || 'Información sobre nuestro hotel';

    const breadcrumb = [
        {
            title: 'Acerca de '
        },
    ]
    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
                <meta head-key="description" name="description" content={page?.description || ''} />
            </Head>

            <Breadcrumb data={breadcrumb} />

            <BenefitsHeader />

            <Rooms />

            <StagesBooking />

            <div className='bg-primary-800/20'>
                <RuleReservation />
            </div>

            <FrequentlyAsked />





        </Layout >
    )
}

export default About
