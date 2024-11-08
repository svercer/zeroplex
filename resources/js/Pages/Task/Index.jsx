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
import {BsClock} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import Card from "@/Components/Task/Card.jsx";

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
                        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
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
            <div className={'grid grid-cols-3 gap-3'}>
                {
                    tasks?.map(task => {
                        return (
                            <Card task={task} key={task.id} handleDelete={handleDelete}/>
                        )
                    })
                }
            </div>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
};

export default Index;
