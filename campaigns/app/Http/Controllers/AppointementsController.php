<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\User;
use App\Notifications\AppointementCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AppointementsController extends Controller
{
    public function index() {
        return auth()->user()->campaigns()->with('adress')->get();
    }
    
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

        auth()->user()->notify(new AppointementCreated($campaign, $data['date']));

        return [
            'success' => 'Appointement saved.'
        ];
    }

    public function destroy(Campaign $campaign, User $user) {
        if(auth()->user()->isAdmin()) {
            $campaign->users()->detach($user->id);
            return [
                'success' => 'Appointement canceled.'
            ];
        }
        if(auth()->user()->campaigns()->contains($campaign->id)) {
            $campaign->users()->detach($user->id);
            return [
                'success' => 'Appointement canceled.'
            ];
        }
        abort(403);
    }
}
