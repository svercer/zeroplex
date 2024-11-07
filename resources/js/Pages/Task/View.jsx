import React from 'react';
import {Head, useForm, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Comment from "@/Components/Comment.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

import {toast,} from 'react-toastify'

const View = () => {
    const {task, comments} = usePage().props
    const {data, setData, post, reset} = useForm({
        text: '',
        task_id: task.id
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('comments.store'), {
            data,
            onSuccess: () => {
                reset('text')
            }
        })
    }
    return (
        <AuthenticatedLayout>
            <Head title={`${task.title}`}/>

            <div className={'flex flex-row justify-between'}>
                <a href="#"
                   className="block max-w-sm min-w-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
                    <p className={'text-xl text-gray-400'}>{task.due_date}</p>
                    <p className={'text-xl text-gray-400'}>{task.status.name}</p>
                </a>
                <div
                    className={'flex flex-col gap-2 bg-gray-600 w-96 border border-gray-200 rounded-lg shadow  dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700 p-3 relative'}>
                    <h1 className={'text-white'}>Comments</h1>
                    <div className={'text-white min-h-[300px] max-h-[500px] overflow-scroll'}>
                        {task?.comments?.map(comment => {
                            return (
                                <Comment comment={comment}/>
                            )
                        })}
                    </div>
                    <div className={' mt-10'}>
                        <form className={'flex flex-row justify-between items-center gap-2'} onSubmit={submit}>
                            <TextInput value={data.text} placeholder={'add comment'}
                                       onChange={(e) => setData('text', e.target.value)}/>
                            <PrimaryButton>Save</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default View;
