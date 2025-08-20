
import InfoIconItem from '@/Components/InfoIconItem'
import TitleSectionLink from '@/Components/TitleSectionLink'
import { ClockIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SectionContact = () => {
    return (
        <section className='py-section overflow-hidden'>
            <div className='container'>
                <div className='grid xl:grid-cols-12'>
                    <div className='xl:col-span-7 pr-16 flex items-center'>
                        <div>
                            <TitleSectionLink title="Contactenos" />

                            <p className='mt-4 text-xl font-light md:max-w-md'>
                                Contáctenos para obtener más información sobre nuestros servicios y cómo podemos ayudarte a satisfacer tus necesidades.
                            </p>
                            <div className='mt-8 grid md:grid-cols-2 gap-x-5 gap-y-8'>
                                <InfoIconItem Icon={PhoneIcon} title={"Telefono"}>
                                    <a className="block" href="tel:+1234567890">(52) 123-12312</a>
                                    <a className="block" href="tel:+1234567890">(52) 123-44556</a>
                                </InfoIconItem>
                                <InfoIconItem Icon={EnvelopeIcon} title={"Email"}>
                                    <a className="block" href="mailto:example@domain.com">contact@granoasisresort.com</a>
                                    <a className="block" href="mailto:example@domain.com">contact@granoasisresort.com</a>
                                </InfoIconItem>
                                <InfoIconItem Icon={MapPinIcon} title={"Ubicacion"}>
                                    <span>
                                        Concon, Chile
                                    </span>
                                </InfoIconItem>
                                <InfoIconItem Icon={ClockIcon} title={"Horario"}>
                                    <span>Cada día <br />
                                        10am a 8pm horas
                                    </span>
                                </InfoIconItem>

                            </div>

                        </div>
                    </div>
                    <div className='mt-10 xl:mt-0 xl:col-span-5 xl:w-[500px]  h-96 xl:h-[600px] rounded-lg overflow-hidden'>
                        <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.214011117684!2d-71.52616363342918!3d-32.91894351569909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dd0dc2e05275%3A0xf1567219e8f3361b!2sRadisson%20Blu%20Acqua%20Hotel%20%26%20Spa%20Conc%C3%B3n!5e0!3m2!1ses-419!2scl!4v1746302986234!5m2!1ses-419!2scl" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default SectionContact
