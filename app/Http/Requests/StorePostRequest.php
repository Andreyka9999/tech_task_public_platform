<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;    // access is controlled by policy while preserving
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required','string','max:255'],
            'content' => ['required','string'],
            'categories' => ['required','array','min:1'],
            'categories.*' => ['integer','exists:categories,id']
        ];
    }

    /**
     * Small trick: sometimes frontend might send field "body"
     * instead of "content". We normalize it here before validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('body') && !$this->has('content')) {
            $this->merge(['content' => $this->input('body')]);
    }

    }
}