import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import DangerButton from "@/Components/DangerButton.jsx";

export default function Dashboard() {
    const {tasks} = usePage().props

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 min-h-screen relative flex flex-col gap-2">
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
                                            <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                                            <td className="border border-gray-300 px-4 py-2 ">
                                                <div className={'flex flex-row items-center gap-2'}>
                                                    <Link  href={route('tasks.edit', {task: task.id})}>Edit</Link>
                                                    <DangerButton  >Delete</DangerButton>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
);
}
