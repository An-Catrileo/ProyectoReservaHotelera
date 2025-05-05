import PrimaryButton from "@/Components/PrimaryButton"
import LayoutProfile from "../../Layouts/LayoutProfile"
import { Head, useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import { useTranslation } from "@/Utils/i18n"

import { FormGrid } from "@/Components/Form/FormGrid"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import InputError from "@/Components/InputError"

const AccountDetails = () => {
    const { auth } = usePage().props
    const __ = useTranslation();

    const [notification, setNotifications] = useState({})
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        phone: auth.user.phone,
        email: auth.user.email,
        email_confirmation: auth.user.email,
        city: auth.user.city,
        country: auth.user.country,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        patch(route('profile.account-details.update'), {
            preserveScroll: true
        })
    }
    
    return (
        <LayoutProfile title={__('profile.account_details')} breadcrumb={[
            {
                title: __('profile.account_details'),
                path: route("profile.account-details")
            },
        ]}>
            <Head title={__('profile.account_details')} />
            <div className="space-y-2">
                <form onSubmit={handleSubmit}>
                    <FormGrid className="max-w-2xl">
                        <div className="sm:col-span-3">
                            <InputLabel>{__('reservation.name')} *</InputLabel>
                            <TextInput className="w-full mt-2" onChange={(e) => setData('name', e.target.value)} name="name" value={data.name} placeholder={`${__('reservation.name')} *`} />
                            <InputError message={errors.name} />
                        </div>
                        <div className=" sm:col-span-3">
                            <InputLabel>{__('reservation.phone')} *</InputLabel>
                            <TextInput className="w-full mt-2" onChange={(e) => setData('phone', e.target.value)} name="phone" value={data.phone} placeholder={`${__('reservation.phone')} *`} />
                            <InputError message={errors.phone} />
                        </div>
                        <div className="sm:col-span-3">
                            <InputLabel>{__('reservation.email')} *</InputLabel>
                            <TextInput className="w-full mt-2" type="email" onChange={(e) => setData('email', e.target.value)} name="email" value={data.email} placeholder={`${__('reservation.email')} *`} />
                            <InputError message={errors.email} />
                        </div>

                        <div className="sm:col-span-3">
                            <InputLabel>{__('profile.confirm_email')} *</InputLabel>
                            <TextInput className="w-full mt-2"
                                type="email"
                                onChange={(e) => setData('email_confirmation', e.target.value)}
                                value={data.email_confirmation}
                                name="email_confirmation"
                                placeholder={`${__('profile.confirm_email')} *`}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <InputLabel>{__('profile.city')} *</InputLabel>
                            <TextInput className="w-full mt-2" onChange={(e) => setData('city', e.target.value)} name="city" value={data.city} placeholder={`${__('profile.city')} *`} />
                            <InputError message={errors.city} />
                        </div>
                        <div className="sm:col-span-3">
                            <InputLabel>{__('profile.country')} *</InputLabel>
                            <TextInput className="w-full mt-2" onChange={(e) => setData('country', e.target.value)} name="country" value={data.country} placeholder={`${__('profile.country')} *`} />
                            <InputError message={errors.country} />
                        </div>
                        <div className="text-right sm:col-span-6">
                            <PrimaryButton disabled={processing} isLoading={processing}>{__('buttons.save')}</PrimaryButton>
                        </div>
                    </FormGrid>
                </form>
            </div>
        </LayoutProfile>
    )
}

export default AccountDetails
