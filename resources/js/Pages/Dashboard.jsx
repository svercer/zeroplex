import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import DangerButton from "@/Components/DangerButton.jsx";
import {useCallback, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export default function Dashboard() {
    const {tasks} = usePage().props
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

    const {data, errors, setData} = useForm({})

    const deleteTask = () => {
        router.delete(route('tasks.destroy', {id: taskToDelete.id}), {
            onSuccess: (response) => {
                onClose()
                toast.success("Successfully deleted")
                router.reload()
            }
        })
    }

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
            <table>
                <thead>
                <tr>
                    <th className="border border-gray-300 text-left px-2 py-2">Title</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Description</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Due Date</th>
                    <th className="border border-gray-300 text-left px-2 py-2">Status</th>
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
                                <td className="border border-gray-300 px-4 py-2 ">
                                    <div className={'flex flex-row items-center gap-2'}>
                                        <Link href={route('tasks.edit', {task: task.id})}>Edit</Link>
                                        <DangerButton onClick={() => handleDelete(task)}>Delete</DangerButton>
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
}
