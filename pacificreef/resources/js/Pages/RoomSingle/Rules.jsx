import { CheckIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { useTranslation } from '@/Utils/i18n'

const Rules = () => {
    const __ = useTranslation();
    
    const rules = [
        __('rules.check_in_out'),
        __('rules.payment'),
        __('rules.passport'),
        __('rules.pets'),
        __('rules.smoking'),
    ]
    return (
        <div className='grid lg:grid-cols-2 gap-4'>
            {rules.map((rule, index) => (
                <div key={index} className='flex'>
                    <CheckIcon className='text-primary-700 shrink-0 w-6 h-6 mr-1.5' />
                    <span className='text-lg text-neutral-700 font-light '>{rule}</span>
                </div>
            ))}
        </div>
    )
}

export default Rules
