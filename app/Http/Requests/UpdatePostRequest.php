<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    /**
     * Validation rules for updating a post.
     * - All fields are optional ("sometimes"), but if they exist → must be valid.
     * - title: text, max 255 chars
     * - content: text, up to 5000 chars
     * - categories: array, at least 1 item, and each item must be a valid category id
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes','required','string','max:255'],
            'content' => ['sometimes','required','string', 'max:5000'],
            'categories' => ['sometimes','array','min:1'],
            'categories.*' => ['integer','exists:categories,id'],
        ];
    }

    /**
     * Same trick as in StorePostRequest:
     * if frontend sends "body" instead of "content",
     * we copy it into 'content' before running validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('body') && !$this->has('content')) {
            $this->merge(['content' => $this->input('body')]);
        }
    }

}
