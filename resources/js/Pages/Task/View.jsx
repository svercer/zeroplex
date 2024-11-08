import React, {useRef} from 'react';
import {Head, useForm, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Comment from "@/Components/Comment.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

import {toast,} from 'react-toastify'
import {CgLock} from "react-icons/cg";
import {BsClock} from "react-icons/bs";

const View = () => {
    const {task, comments} = usePage().props
    const {data, setData, post, reset} = useForm({
        text: '',
        task_id: task.id
    })

    const commentDiv = useRef()

    const submit = (e) => {
        e.preventDefault()
        post(route('comments.store'), {
            data,
            onSuccess: () => {
                reset('text')
                if (commentDiv.current) {
                    commentDiv.current.scrollTo(0, 0);
                }
            },
            preserveScroll: true
        })
    }
    return (
        <AuthenticatedLayout>
            <Head title={`${task.title}`}/>

            <div className={'flex flex-col justify-between gap-3'}>
                <div
                    className="block  w-full p-6 border border-gray-200 rounded-lg shadow bg-white ">
                    <div className={'flex flex-row justify-between'}>
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
                            {task.title}
                        </h5>
                        <div
                            className={'rounded-lg bg-indigo-300 px-3 py-1 h-6 flex flex-row text-xs items-center '}>{task.status.name.toUpperCase()}</div>
                    </div>
                    <p className="font-normal text-gray-500 dark:text-gray-600">{task.description}</p>
                    <div className={'flex flex-row items-center gap-2 mt-6 justify-end text-xs'}>
                        <BsClock className={''}/>
                        <p className={' text-gray-400'}>
                            {task.due_date}
                        </p>
                    </div>
                </div>
                <div
                    className={'block  w-full p-6 border border-gray-200 rounded-lg shadow bg-white '}>
                    <h1 className={'text-gray-800'}>Comments</h1>
                    <div className={' mt-10'}>
                        <form className={'flex flex-col justify-between items-start gap-2'} onSubmit={submit}>
                            <textarea value={data.text} placeholder={'add comment'}
                                      className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full'}
                                      onChange={(e) => setData('text', e.target.value)}/>
                            <PrimaryButton className={'flex self-end'}>Save</PrimaryButton>
                        </form>
                    </div>
                    <div className={'min-h-[300px] max-h-[500px] overflow-scroll'} ref={commentDiv}>
                        {task?.comments?.map(comment => {
                            return (
                                <Comment comment={comment}/>
                            )
                        })}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default View;
