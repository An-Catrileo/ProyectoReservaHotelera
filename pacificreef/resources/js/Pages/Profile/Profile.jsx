import LayoutProfile from "@/Layouts/LayoutProfile"
import { Head, Link } from "@inertiajs/react"
import { useTranslation } from "@/Utils/i18n"

const Dashboard = () => {
    const __ = useTranslation();
    
    return (
        <LayoutProfile title="Dashboard" breadcrumb={[
            {
                title: __('nav.home'),
                path: route("profile.index")
            },
        ]}>
            <Head title={__('nav.profile')} />
            <div className="space-y-2">
                <div>
                    {__('profile.dashboard_intro')}
                    <Link href={route('profile.reservations')} className="font-bold underline px-1 ">
                        {__('profile.my_reservations').toLowerCase()}
                    </Link>
                    , {__('profile.manage')}
                    <Link href={route('profile.account-details')} className="font-bold underline px-1 ">
                        {__('profile.account_details').toLowerCase()}
                    </Link>
                    {__('profile.and')}
                    <Link href={route('profile.password')} className="font-bold underline px-1 ">
                        {__('profile.change_password').toLowerCase()}
                    </Link>
                    .
                </div>
            </div>
        </LayoutProfile >
    )
}

export default Dashboard
