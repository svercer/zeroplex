<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'due_date' => ['required', 'date'],
            'status_id' => ['required', 'exists:statuses,id']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
