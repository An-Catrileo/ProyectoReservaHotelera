import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
    const { locale } = usePage().props;
    
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full text-white hover:text-primary-100">
                    <GlobeAmericasIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={route('language.switch', { locale: 'es' })}
                                    className={`${active ? 'bg-gray-100' : ''} ${locale === 'es' ? 'font-semibold' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                    Español
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={route('language.switch', { locale: 'en' })}
                                    className={`${active ? 'bg-gray-100' : ''} ${locale === 'en' ? 'font-semibold' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                    English
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default LanguageSwitcher; 