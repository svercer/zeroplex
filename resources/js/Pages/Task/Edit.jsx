import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm, usePage} from '@inertiajs/react'
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";
import 'react-toastify/dist/ReactToastify.css'
import {toast, ToastContainer} from "react-toastify";

const Edit = () => {
    const {task, statuses} = usePage().props
    const {patch, data, setData, errors, processing, reset} = useForm({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status_id: task.status_id
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('tasks.update', {task: task.id}), {
            data: data,
            onSuccess: async () => {
                await toast.success('Task was updated');
                setTimeout(() => {
                    router.visit(route('dashboard'))
                }, 1000)
            }
        })
    }
    return (
        <AuthenticatedLayout>
            <Head title={`${task.title}`}/>
            Edit Task
            <form onSubmit={submit} className={'flex flex-col gap-3 w-2/3 '}>
                <TextInput
                    type="text"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                />

                {errors.title && <InputError message={errors.title}/>}
                <textarea
                    className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />
                {errors.description && <InputError className={'text-red-500'} message={errors.description}/>}
                <TextInput
                    type="date"
                    value={data.due_date}
                    onChange={e => setData('due_date', e.target.value)}
                />
                {errors.description && <InputErrorstatus message={errors.due_date}/>}
                <select value={data.status_id} onChange={(e) => setData('status_id', e.target.value)}>
                    {statuses.map(status => {
                        return (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        )
                    })}
                </select>
                <div className={'flex flex-row justify-start'}>
                    <PrimaryButton type="submit" disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
};

export default Edit;
