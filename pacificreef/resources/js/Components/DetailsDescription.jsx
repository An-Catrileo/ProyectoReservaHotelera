import React from 'react'

const DetailsDescription = ({ title = '', children }) => {
    return (
        <div className='flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-5 py-2'>
            <dt className='font-medium text-gray-600 sm:font-normal'>{title}:</dt>
            <dd className='font-medium break-words'>{children}</dd>
        </div>
    )
}

export default DetailsDescription
