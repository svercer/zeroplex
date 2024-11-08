import React, {useState} from 'react';
import {isAdmin} from "@/src/utils.js";
import {BiPencil, BiTrash, BiUser} from "react-icons/bi";
import {BsClock, BsEye} from "react-icons/bs";
import {Link, usePage} from "@inertiajs/react";
import {FiMoreVertical} from "react-icons/fi";
import DangerButton from "@/Components/DangerButton.jsx";

const Card = ({task, handleDelete}) => {
    const {auth} = usePage().props
    const [openActions, setOpenActions] = useState();

    const handleActionClick = (e) => {
        e.preventDefault()
        setOpenActions(!openActions)
    };

    const handleDeleteAction = (e) => {
        e.preventDefault()
        console.log('delete')
        handleDelete(task)
    };
    return (
        <a href={route('tasks.show', {task: task.id})}
           className="block  w-full p-6 border border-gray-200 rounded-lg shadow bg-white relative">
            <button onClick={handleActionClick}>
                <FiMoreVertical className={'absolute right-2 top-2'}/>
            </button>
            <div className={'flex flex-row justify-between'}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                    {task.title}
                </h5>
                <div
                    className={'rounded-lg bg-indigo-300 px-3 py-1 h-8 flex flex-row text-xs items-center text-nowrap'}>{task.status.name.toUpperCase()}</div>
            </div>
            <p className="font-normal text-gray-500 dark:text-gray-600 text-sm mb-6">{task.description.slice(0, 100)}... </p>
            <div className={'absolute bottom-2 right-3 left-3'}>
                <div className={'flex flex-row justify-between items-center'}>
                    {
                        isAdmin(auth.user) &&
                        <div className="text-sm flex flex-row gap-1 items-center">
                            <BiUser/> {task.user.email}</div>
                    }
                    <div className={'flex flex-row  gap-2   text-xs'}>
                        <BsClock className={''}/>
                        <p className={' text-gray-400'}>
                            {task.due_date}
                        </p>
                    </div>
                </div>
            </div>
            {
                openActions &&
                <div className={'bg-white absolute right-7 top-1 z-30 px-3 py-1 rounded-md'}>
                    <div className={'flex flex-row gap-1 items-center'}>
                        <Link href={route('tasks.edit', {task: task.id})}><BiPencil className={'h-5 w-5'}/></Link>
                        <button onClick={handleDeleteAction}><BiTrash className={'text-red-500 h-5 w-5'}/></button>
                        <Link href={route('tasks.show', {task: task.id})}><BsEye className={'h-5 w-5'}/></Link>
                    </div>
                </div>
            }
        </a>
    );
};

export default Card;
