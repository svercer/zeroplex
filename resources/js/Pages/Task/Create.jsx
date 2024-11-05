import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {useForm} from '@inertiajs/react'
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import 'react-toastify/dist/ReactToastify.css'

import {toast, ToastContainer} from 'react-toastify'

const Create = () => {
    const {post, data, setData, errors, processing, reset} = useForm({
        title: "",
        description: "",
        due_date: "",

    })

    const submit = (e) => {
        e.preventDefault()
        post(route('tasks.store'), {
            data: data, onSuccess: () => {
                toast.success('Task was created');
                reset()
            }
        })
    }
    return (
        <AuthenticatedLayout>
            Create Task
            <form onSubmit={submit} className={'flex flex-col gap-3 w-2/3 '}>
                <TextInput type="text" value={data.title} onChange={e => setData('title', e.target.value)}/>
                {errors.title && <div className={'text-red-500'}>{errors.title}</div>}
                <textarea
                    className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'}
                    value={data.description} onChange={e => setData('description', e.target.value)}/>
                {errors.description && <div className={'text-red-500'}>{errors.description}</div>}
                <TextInput type="date"
                           value={data.due_date}
                           placeholder={'Please select a date'}
                           onChange={e => setData('due_date', e.target.value)}/>
                {errors.description && <div className={'text-red-500'}>{errors.description}</div>}
                <div className={'flex flex-row justify-start'}>
                    <PrimaryButton type="submit" disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
};

export default Create;
