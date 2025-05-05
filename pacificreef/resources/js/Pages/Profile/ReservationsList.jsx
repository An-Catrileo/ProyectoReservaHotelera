import { useState } from "react";
import LayoutProfile from "../../Layouts/LayoutProfile";

import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Badge from "@/Components/Badge";
import { formatCurrency, formatDate } from "@/Helpers/helper";

const ReservationsList = ({ reservations }) => {
    // Función para obtener el color del estado de pago
    const getPaymentStatusColor = (status) => {
        if (status === 'paid') return 'green';
        if (status === 'partially_paid') return 'yellow';
        return 'red';
    };

    // Función para obtener el texto del estado de pago
    const getPaymentStatusText = (status) => {
        if (status === 'paid') return 'Pagado completamente';
        if (status === 'partially_paid') return 'Pago parcial (30%)';
        return 'Sin pagar';
    };

    return (
        <LayoutProfile title="Mis Reservaciones" breadcrumb={[
            {
                title: "Reservaciones",
                path: route("profile.reservations")
            },
        ]}>
            <Head title="Mis Reservaciones" />

            <div className="space-y-2">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Estado</th>
                            <th>Habitación</th>
                            <th>Fechas</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.data.map((item, key) => (
                            <tr key={key}>
                                <td>
                                    <Link preserveScroll className="block font-medium text-primary-600" href={route('profile.reservation', item.code)}>
                                        #{item.code}
                                    </Link>
                                </td>
                                <td>
                                    <Badge color={getPaymentStatusColor(item.payment_status)} className="text-sm">
                                        {getPaymentStatusText(item.payment_status)}
                                    </Badge>
                                </td>
                                <td>
                                    {item.data.room.name}
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2">
                                            <span className="text-primary-600">Entrada:</span>
                                            <span>{formatDate(item.start_date)}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-primary-600">Salida:</span>
                                            <span>{formatDate(item.end_date)}</span>
                                        </div>
                                        <Badge className="mt-1 self-start">{item.nights} {item.nights > 1 ? 'noches' : 'noche'}</Badge>
                                    </div>
                                </td>
                                <td>
                                    <span className="font-medium text-base">{formatCurrency(item.total)}</span>
                                    {item.payment_status === 'partially_paid' && (
                                        <div className="flex flex-col mt-2">
                                            <small className="text-green-600">Pagado: {formatCurrency(item.deposit_amount)}</small>
                                            <small className="text-yellow-600">Pendiente: {formatCurrency(item.remaining_amount)}</small>
                                            <Link 
                                                href={route('payment.remaining', { code: item.code })}
                                                className="text-xs bg-primary-600 text-white px-2 py-1 rounded mt-1 inline-block"
                                            >
                                                Completar pago
                                            </Link>
                                        </div>
                                    )}
                                    {item.payment_status === 'unpaid' && (
                                        <div className="mt-2">
                                            <Link 
                                                href={route('payment.options', { code: item.code })}
                                                className="text-xs bg-primary-600 text-white px-2 py-1 rounded inline-block"
                                            >
                                                Realizar pago
                                            </Link>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reservations.meta && reservations.meta.total > reservations.meta.per_page && (
                    <div className="mt-8">
                        <Pagination paginator={reservations.meta} />
                    </div>
                )}
            </div>
        </LayoutProfile>
    );
};

export default ReservationsList;
