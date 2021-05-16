<?php

namespace App\Http\Controllers;

use App\Http\Helpers\GoogleCalendarHelper;
use Illuminate\Http\Request;

class GCOAuth2Controller extends Controller
{    
    /**
     * Generate URL to OAuth2 consent screen.
     *
     * @return array
     */
    public function authUrl() {
        $gcHelper = new GoogleCalendarHelper();
        $client = $gcHelper->getClient();

        return [
            'url' => $client->createAuthUrl()
        ];
    }
    
    /**
     * Handle Google Calendar OAuth2 callback.
     *
     * @return void
     */
    public function oauth2callback(Request $request) {
        $gcHelper = new GoogleCalendarHelper();
        $client = $gcHelper->getClient();

        if ($request->has('code')) {
            $token = $client->fetchAccessTokenWithAuthCode($request->code);
            auth()->user()->update([
                'google_calendar_token' => $token,
                'google_calendar_api_activated' => true
            ]);
        }

        $gcHelper->saveUserEvents($client);

        return response('', 200);
    }
}
