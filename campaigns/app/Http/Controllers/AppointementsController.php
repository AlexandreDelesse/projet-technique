<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class AppointementsController extends Controller
{
    public function store(Campaign $campaign) {
        $data = request()->validate([
            'date' => 'required|date',
            'bloodgroup_id' => 'sometimes|exists:bloodgroups,id'
        ]);

        if(request()->has('bloodgroup_id')) {
            auth()->user()->update([
                'bloodgroup_id' => $data['bloodgroup_id']
            ]);
        }

        $campaign->users()->attach(auth()->user()->id, ['date' => $data['date']]);

        return [
            'success' => 'Appointement saved.'
        ];
    }
}
