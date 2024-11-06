<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Task;
use App\Notifications\AddCommentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
    }

    public function create()
    {
    }

    public function store(CommentRequest $request)
    {
        try {
            $task = Task::find($request->task_id);
            Comment::create(array_merge($request->all(), ['user_id' => Auth::user()->id]));
            $task->user->notify(new AddCommentNotification($task));
        } catch (\Throwable $tr) {
            throw $tr;
        }

        return redirect()->back();
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
