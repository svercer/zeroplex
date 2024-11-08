import React from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import {usePage} from "@inertiajs/react";

const Comment = ({comment}) => {
    return (
        <div className="my-4 flex flex-col ">
            <div className={'flex flex-row items-center justify-start text-gray-700 gap-6'}>
                <div className={'font-bold'}>{comment.user.name}</div>
                <div className={'text-xs'}>{new Date(comment.created_at).toDateString()}</div>
            </div>
            <textarea className={'text-gray-500 border border-gray-200 rounded-md'} disabled value={comment.text}/>
        </div>
    );
};

export default Comment;
