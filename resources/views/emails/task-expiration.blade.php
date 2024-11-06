@component('mail::message')
# Introduction

Task Expiration
Your task: {{$task->title}} has expired
@component('mail::button', ['url' => route('tasks.show', ['task' => $task->id])])
    View Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
