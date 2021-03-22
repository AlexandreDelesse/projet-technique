<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCampaignRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'capacity' => 'required|integer',
            'file_id' => 'required|exists:files,id',
            'adress' => 'required|array',
            'adress.label' => 'required|string',
            'adress.name' => 'required|string',
            'adress.postcode' => 'required|alpha_num',
            'adress.city' => 'required|string',
            'adress.street' => 'required|string',
            'adress.importance' => 'required|numeric',
            'adress.x' => 'required|numeric',
            'adress.y' => 'required|numeric',
        ];
    }
}
