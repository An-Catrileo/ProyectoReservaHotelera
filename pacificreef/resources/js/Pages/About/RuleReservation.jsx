import Card from '@/Components/Card'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import TitleSection from '@/Components/TitleSection'
import { CheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

const RuleReservation = () => {
    return (
        <section className='py-section'>
            <div className='container'>
                <div className='grid lg:grid-cols-2 gap-10 lg:gap-20'>
                    <div className='lg:max-w-md'>
                        <TitleSection>
                            Acuerdo de reglas
                        </TitleSection>
                        <div className='mt-12'>
                            <ul className='space-y-5'>
                                <RuleItem>
                                    El Check-In es a partir de las 14:00 y el Check-Out es a las 12:00.
                                </RuleItem>
                                <RuleItem>
                                    El hospedaje debe estar pagado en su totalidad al momento del check-in.
                                </RuleItem>
                                <RuleItem>
                                    Para alojarse, es obligatorio presentar un pasaporte o documento de identidad vigente.
                                </RuleItem>
                                <RuleItem>
                                    Se solicita cuidar las instalaciones y mantener el orden para el bienestar de todos los huéspedes.
                                </RuleItem>
                                <RuleItem>
                                    Mantenga un ambiente de respeto, evitando ruidos excesivos que puedan afectar el descanso de otros huéspedes.
                                </RuleItem>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <Card className="p-6 lg:py-14 lg:px-10">
                            <TitleSection>
                                Estamos listos para responder a tus preguntas
                            </TitleSection>
                            <div className='mt-10 lg:mt-10 grid lg:grid-cols-2 gap-2 lg:gap-4'>

                                <TextInput placeholder="Nombre" />
                                <TextInput placeholder="Email" />
                                <textarea placeholder="Haga sus preguntas aqui" className='lg:col-span-2 textarea-form'>
                                    
                                </textarea>
                                <div className='mt-2'>
                                    <PrimaryButton className='w-full lg:w-auto'>Envia mensaje</PrimaryButton>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

        </section>

    )
}


const RuleItem = ({ children }) => {
    return (
        <li className='flex  text-lg text-primary-900 font-light'>
            <CheckIcon className=' w-6 h-6 mr-2 shrink-0' />
            {children}
        </li>
    )
}

export default RuleReservation
