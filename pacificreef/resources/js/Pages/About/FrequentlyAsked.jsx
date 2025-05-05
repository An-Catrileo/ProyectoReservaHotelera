import Card from '@/Components/Card'
import SecondaryButton from '@/Components/SecondaryButton'
import TitleEntry from '@/Components/TitleEntry'
import TitleSection from '@/Components/TitleSection'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from '@/Utils/i18n'

const FrequentlyAsked = () => {
	const __ = useTranslation();

	const faqs = [
		{
			ask: __('faq.questions.choose_room.question'),
			answer: __('faq.questions.choose_room.answer')
		},
		{
			ask: __('faq.questions.capacity.question'),
			answer: __('faq.questions.capacity.answer')
		},
		{
			ask: __('faq.questions.private_rooms.question'),
			answer: __('faq.questions.private_rooms.answer')
		},
		{
			ask: __('faq.questions.security_items.question'),
			answer: __('faq.questions.security_items.answer')
		},
		{
			ask: __('faq.questions.personal_security.question'),
			answer: __('faq.questions.personal_security.answer')
		},
	]
	
	return (
		<section className='py-section'>
			<div className='container'>
				<TitleEntry>
					<TitleEntry.Title>
						{__('faq.title')}
					</TitleEntry.Title>
					<TitleEntry.Entry>
						{__('faq.subtitle')}
					</TitleEntry.Entry>
				</TitleEntry>


				<div className='mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
					{faqs.map((faq, index) => (
						<div key={index}>
							<AccordionFaq faq={faq} />
						</div>
					))}

					<div>
						<div className="rounded-lg shadow bg-primary-800 p-5 md:p-6 text-white">
							<h4 className='font-bold text-xl '>
								{__('faq.have_question')}
							</h4>
							<p className='mt-5'>
								{__('faq.not_found_answer')}
							</p>
							<Link href={route('contact')} className="mt-6 btn-secondary">{__('buttons.ask_question')}</Link>
						</div>
					</div>


				</div>
			</div>
		</section >
	)
}


const AccordionFaq = ({ faq }) => {
	return (
		<Card className="p-5 md:p-6">
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full justify-between items-center">
							<span className='font-bold text-xl text-primary-800 text-left'>
								{faq.ask}
							</span>
							<ChevronUpIcon
								className={`${open ? 'rotate-180 transform' : ''
									} h-5 w-5 text-primary-800`}
							/>
						</Disclosure.Button>

						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel className="font-light">
								<p className='mt-3'>
									{faq.answer}
								</p>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
		</Card>
	)
}

export default FrequentlyAsked
