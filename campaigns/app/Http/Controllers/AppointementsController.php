<?php

namespace App\Http\Controllers;

use App\Http\Helpers\GoogleCalendarHelper;
use App\Models\Campaign;
use App\Models\User;
use App\Notifications\AppointementCreated;
use Carbon\Carbon;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rule;

class AppointementsController extends Controller
{
    public function index() {
        return auth()->user()->campaigns()->with('adress')->get();
    }
    
    public function store(Campaign $campaign) {
        $data = request()->validate([
            'slot' => [
                'required',
                'date',
                Rule::unique('campaign_user', 'date')->where(function($query) use($campaign) {
                    return $query->where('campaign_id', $campaign->id);
                }),
            ],
            'bloodgroup_id' => 'required|exists:bloodgroups,id'
        ], [
            'slot.unique' => 'Ce rendez-vous est déja réservé, merci de prendre un autre créneau.'
        ]);
        
        auth()->user()->update([
            'bloodgroup_id' => $data['bloodgroup_id']
        ]);

        $campaign->users()->attach(auth()->user()->id, ['date' => $data['slot']]);

        auth()->user()->notify(new AppointementCreated($campaign, $data['slot']));

        if(auth()->user()->google_calendar_api_activated) {
            $gcHelper = new GoogleCalendarHelper();
            $client = $gcHelper->getClient();
            $service = new Google_Service_Calendar($client);
            $client->setAccessToken(auth()->user()->google_calendar_token);
            if($client->isAccessTokenExpired()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            }
            $event = new Google_Service_Calendar_Event([
                'summary' => $campaign->title,
                'location' => $campaign->adress->label,
                'description' => $campaign->description,
                'start' => [
                    'dateTime' => Carbon::createFromTimeString($data['slot']),
                    'timeZone' => 'Europe/Paris',
                ],
                'end' => [
                    'dateTime' => Carbon::createFromTimeString($data['slot'])->addMinutes($campaign->slot_duration),
                    'timeZone' => 'Europe/Paris',
                ],
                'reminders' => [
                    'useDefault' => true,
                ],
            ]);
            $calendarId = 'primary';
            $service->events->insert($calendarId, $event);
        }

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
        if($campaign->users->contains(auth()->id())) {
            $campaign->users()->detach($user->id);
            return [
                'success' => 'Appointement canceled.'
            ];
        }
        abort(403);
    }
}
