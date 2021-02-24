<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'birthdate' => 'sometimes|date',
            'adress' => 'sometimes|string',
            'phone' => 'sometimes',
            'bloodgroup_id'=> 'sometimes|exists:bloodgroup,id',
            'type' => [
                'required',
                Rule::in(['0', '1'])
            ],
            'gender' => [
                'required',
                Rule::in(['Male', 'Female'])
            ],
            'avatar' => 'sometimes|url',
            'email' => 'required|email',
            'password'=>'required|min:8'

        ];
    }
}
