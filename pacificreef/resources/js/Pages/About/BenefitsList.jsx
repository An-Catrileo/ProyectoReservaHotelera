import React from 'react'

const BenefitsList = () => {
	return (
		<div className='py-14 px-8 lg:px-12 shadow rounded-xl'>
			<div className='grid lg:grid-cols-3 gap-y-10 lg:divide-x-2 divide-primary-700/10'>
				<BenefitsItem className='lg:pr-14' title="240+">
					Habitaciones modernas y cómodas para que disfrute de una estancia inolvidable.
				</BenefitsItem>
				<BenefitsItem className='lg:px-14' title="60+">
					Servicios de primera calidad para que se sienta como en casa.
				</BenefitsItem>
				<BenefitsItem className='lg:pl-14' title="98%">
					Rembolso de la tarifa si no está satisfecho con el servicio.
				</BenefitsItem>
			</div>
		</div>
	)
}

const BenefitsItem = ({ title, className = '', children }) => {
	return (
		<div className={className} >
			<span className='text-4xl lg:text-5xl text-primary-800 font-extrabold'>{title}</span>
			<p className='mt-2 lg:mt-4'>{children}</p>
		</div>
	)
}


export default BenefitsList
