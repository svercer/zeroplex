import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {ToastContainer} from "react-toastify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const View = () => {
    const {task} = usePage().props
    return (
        <AuthenticatedLayout>
            <Head title={`${task.title}`}/>

            <a href="#"
               className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {task.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
                <p className={'text-xl text-gray-400'}>{task.due_date}</p>
                <p className={'text-xl text-gray-400'}>{task.status.name}</p>
            </a>
        </AuthenticatedLayout>
    );
};

export default View;
