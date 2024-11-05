import React from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import {usePage} from "@inertiajs/react";

const Comment = ({comment}) => {
    console.log('comment', comment)

    const {auth} = usePage().props
    const getStylesAccordingToAuthor = (
        userId,
        commentAuthorId
    ) => {
        if (userId && commentAuthorId) {
            return userId === commentAuthorId
                ? {color: "bg-blue-600", align: "justify-end", remove: true}
                : {color: "bg-gray-400", align: "justify-start", remove: false};
        }
    };
    const styles = getStylesAccordingToAuthor(auth?.user?.id, comment?.user?.id)
    const removeComment = () => {
    }
    return (
        <div className="my-2">
            <div className={`flex flex-row ${styles?.align} items-center`}>
                <div
                    contentEditable={false}
                    className={`text-white text-xs p-2 rounded-xl flex flex-row ${styles?.color}`}
                >
                    {comment.text}
                </div>
                <div className="">
                    <BsThreeDotsVertical
                        className="cursor-pointer dark:text-white text-gray-600"
                    />
                </div>
            </div>
            <div className={`flex flex-row ${styles?.align} pr-5`}>
                <div className="flex flex-row">
                    <div className="text-gray-500 text-xs">
                        {comment.created_at}
                    </div>
                    {styles?.remove && (
                        <button
                            onClick={() => removeComment(comment?.id)}
                            type="button"
                            className="text-xs ml-2 text-red-500"
                        >
                            remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
