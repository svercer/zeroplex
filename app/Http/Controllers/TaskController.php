<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateRequest;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', [Task::class, request()->user()]);
        return Inertia::render('Task/Index');
    }

    public function create()
    {
        return Inertia::render('Task/Create');
    }

    public function store(CreateRequest $request)
    {
        $req = [
            ...$request->all(),
            ...['user_id' => Auth::user()->id, 'status_id' => 1]
        ];

        Task::create($req);
        return to_route('tasks.create');
    }

    public function show($id)
    {
        return Inertia::render('Task/View');
    }

    public function edit(Task $task)
    {
        return Inertia::render('Task/Edit', ['task' => $task, 'statuses' => Status::all()]);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());
        return redirect()->back()->with(['message' => __('task.updated')]);
    }

    public function destroy(Task $task)
    {
        try {
            $task->delete();
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return redirect()->back()->with(['message' => 'Deleted']);
    }
}
