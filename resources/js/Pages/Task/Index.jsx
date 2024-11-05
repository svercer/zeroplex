import React, {useCallback, useState} from 'react';
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import {toast, ToastContainer} from "react-toastify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {isAdmin} from "@/src/utils.js";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

import queryString from 'query-string';

const Index = () => {
    const {tasks, auth, statuses} = usePage().props
    const parsed = queryString.parse(location.search);

    const [taskToDelete, setTaskToDelete] = useState(null)
    const [open, setOpen] = useState(false)

    const handleDelete = useCallback(
        (task) => {
            setTaskToDelete(task)
            setOpen(true)
        },
        [],
    );

    const onClose = () => {
        setTaskToDelete(null)
        setOpen(false)
    }

    const deleteTask = () => {
        router.delete(route('tasks.destroy', {id: taskToDelete.id}), {
            onSuccess: (response) => {
                toast.success("Successfully deleted")
                onClose()
            }
        })
    }

    const {data, setData, get, processing,} = useForm({
        due_date: parsed?.due_date ?? '',
        status_id: parsed?.status_id ?? ''
    })

    const handleFilter = (e) => {
        e.preventDefault()
        get(route('tasks.index', {
            due_date: data.due_date,
            status_id: data.status_id,
        }))
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>
            <Modal show={open} onClose={onClose}>
                <div className={'p-6 flex flex-col gap-6 items-start justify-between min-h-40'}>
                    <p>Are you sure you want to delete <span
                        className={'font-bold'}>{taskToDelete?.title}</span></p>
                    <div className={'flex flex-row justify-end w-full items-center gap-3'}>
                        <SecondaryButton>Cancel</SecondaryButton>
                        <DangerButton onClick={deleteTask}>Confirm</DangerButton>
                    </div>
                </div>
            </Modal>

            <div className={'w-full flex justify-end'}>
                <Link href={route('tasks.create')} className={'underline text-blue-500'}>Add</Link>
            </div>
            <form className={'flex flex-row gap-2 justify-start items-center'} onSubmit={handleFilter}>
                <TextInput type={'date'} onChange={(e) => setData('due_date', e.target.value)} value={data.due_date}/>
                {
                    <select value={data.status_id} onChange={(e) => setData('status_id', e.target.value)}>
                        {statuses.map(status => {
                            return (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            )
                        })}
                    </select>
                }
                <PrimaryButton type={'submit'} disabled={processing}>Search</PrimaryButton>
                <Link href={route('tasks.index')}>Reset</Link>
            </form>
            <table>
                <thead>
                <tr>
                    <th className="border border-gray-300 text-left px-2 py-2">Title</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Description</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Due Date</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Status</th>
                    {isAdmin(auth.user) && <th className="border border-gray-300 text-left px-2 py-2">User</th>}
                    <th className="border border-gray-300 text-left px-2 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    tasks?.map(task => {
                        return (
                            <tr key={task.id}>
                                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.due_date}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.status.name}</td>
                                {isAdmin(auth.user) &&
                                    <td className="border border-gray-300 px-4 py-2">{task.user.email}</td>}
                                <td className="border border-gray-300 px-4 py-2 ">
                                    <div className={'flex flex-row items-center gap-2'}>
                                        <Link href={route('tasks.edit', {task: task.id})}>Edit</Link>
                                        <DangerButton onClick={() => handleDelete(task)}>Delete</DangerButton>
                                        <Link href={route('tasks.show', {task: task.id})}>View</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
};

export default Index;
