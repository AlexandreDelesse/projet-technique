<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
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
            'slug' => 'required|string',
            'body' => 'required|string',
            'excerpt' => 'required|string',
            'file_id'=> 'sometimes|exists:files,id',
            'category_id'=> 'sometimes|exists:categories,id'
        ];
    }
}
