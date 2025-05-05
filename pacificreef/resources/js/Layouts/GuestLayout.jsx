import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Card';
import { Link } from '@inertiajs/react';
import Layout from './Layout';

export default function Guest({ children }) {
    return (
        <Layout>
            <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 bg-gray-100">
                <div className="mb-6">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo textColor="text-primary-700" />
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        {children}
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>¿Necesita ayuda? Contacte a <a href="mailto:soporte@pacificreef.com" className="text-primary-600 hover:text-primary-500">soporte@pacificreef.com</a></p>
                </div>
            </div>
        </Layout>
    );
}
