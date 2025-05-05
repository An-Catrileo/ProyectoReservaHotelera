import React from 'react'
import { BuildingOffice2Icon } from '@heroicons/react/16/solid'
import { Link, usePage } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import ApplicationLogo from '@/Components/ApplicationLogo'
import ButtonReserve from './ButtonReserve'
import ProfileDropdown from './ProfileDropdown'
import LanguageSwitcher from '@/Components/LanguageSwitcher'
import { useTranslation } from '@/Utils/i18n'

const NavbarDesktop = ({ navigations }) => {
    const { auth, locale } = usePage().props
    const __ = useTranslation();
    
    return (
        <nav className="h-24 items-center z-40 relative hidden lg:flex shadow bg-gray-900">
            <div className='container flex justify-between'>
                <ApplicationLogo textColor='text-white' />
                <div className='flex items-center gap-x-6'>
                    {navigations.map((navigation, index) => (
                        <Link key={index} href={route(navigation.routeName)} className={
                            (route().current(navigation.routeName)
                                ? 'text-primary-100 shadow-[0px_2px_0px] shadow-primary-100 font-medium '
                                : 'text-white hover:text-primary-100 hover:shadow-[0px_2px_0px] hover:shadow-primary-500 ') +
                            ' font-medium'}>
                            {__(`nav.${navigation.routeName === 'home' ? 'home' : 
                                navigation.routeName === 'about' ? 'about' : 
                                navigation.routeName === 'rooms' ? 'rooms' : 
                                navigation.routeName === 'gallery' ? 'gallery' : 
                                navigation.routeName === 'contact' ? 'contact' : 
                                navigation.routeName === 'legal-policies' ? 'legal' : 
                                navigation.routeName === 'search-reservation' ? 'search_reservation' : 
                                navigation.routeName}`)}
                        </Link>
                    ))}
                    <div>
                        {auth.user ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <div className="flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
                                    <Link href={route('login')} className="text-white hover:text-primary-100 hover:shadow-[0px_2px_0px] hover:shadow-primary-500 font-medium">
                                        {__('nav.login')}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                    <LanguageSwitcher />
                    <ButtonReserve />
                </div>
            </div>
        </nav>
    )
}

export default NavbarDesktop
