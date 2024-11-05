import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import DangerButton from "@/Components/DangerButton.jsx";
import {useCallback, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {isAdmin} from "@/src/utils.js";


export default function Dashboard() {
    const {tasks_count, auth} = usePage().props

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className={'shadow-md max-w-96 h-48 flex flex-col gap-2 items-start p-10 relative bg-gray-200'}>
                <p className={'font-bold text-2xl'}>Tasks</p>
                <span>Total: {tasks_count}</span>
                <Link className={'text-blue-600 absolute bottom-4 right-4'} href={route('tasks.index')}>View all</Link>
            </div>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
}
