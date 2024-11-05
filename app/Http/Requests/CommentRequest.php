<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'text' => ['required', 'string'],
            'task_id' => ['required', 'exists:tasks,id']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
