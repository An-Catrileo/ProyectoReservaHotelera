import React from 'react'
import Flatpickr from "react-flatpickr";
import { Input } from '../Components/ui/input';
import * as SpanishLocale from '@/flatpickr_l10n/es.js'
const InputDate = ({ options, ...props }) => {


    return (
        <Flatpickr
            {...props}
            options={{
                altInput: true,
                altFormat: "D d M Y",
                dateFormat: "Y-m-d",
                locale: SpanishLocale,
                firstDayOfWeek: 1,
                ...options
            }}

        />
    )
}

export default InputDate
