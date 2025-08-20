import TitleSection from '@/Components/TitleSection'
import TitleSectionLink from '@/Components/TitleSectionLink'
import React from 'react'
import BenefitsList from './BenefitsList'
import TitleEntry from '@/Components/TitleEntry'

const BenefitsHeader = () => {
    return (
        <section className='py-section'>
            <div className='container'>
                <TitleEntry>
                    <TitleEntry.Title>
                        Los principales beneficios de elegir Gran Oasis Resort
                    </TitleEntry.Title>
                    <TitleEntry.Entry>
                        Aproveche la oportunidad de disfrutar de una experiencia inolvidable en Gran Oasis Resort, su hotel ideal en Concón.
                    </TitleEntry.Entry>
                </TitleEntry>

                <div className='mt-12'>
                    <BenefitsList />
                </div>

                <div className='mt-12 lg:mt-14'>
                    <iframe className='w-full aspect-video rounded-lg ' src="https://www.youtube.com/embed/vLrGZNt842I?si=G91aYTqwJQsMpb7v" title="South Korea&#39;s Top 5 Luxury Hotels" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        </section>
    )
}

export default BenefitsHeader
