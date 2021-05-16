<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateUserRequest extends FormRequest
{
    

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'sometimes|string',
            'lastname' => 'sometimes|string',
            'birthdate' => 'sometimes|date',
            'phone' => 'sometimes',
            'bloodgroup_id' => 'sometimes|exists:bloodgroups,id',
            'gender' => [
                'sometimes',
                Rule::in(['Male', 'Female'])
            ],
            'avatar' => 'sometimes|url',
            'email' => 'sometimes|email',
            'receive_emails' => 'sometimes|boolean'
        ];
    }
}
