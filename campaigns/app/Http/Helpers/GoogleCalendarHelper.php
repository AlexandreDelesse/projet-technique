<?php

namespace App\Http\Helpers;

use App\Models\GoogleCalendarEvents;
use Carbon\Carbon;
use Google\Client;
use Google_Service_Calendar;

class GoogleCalendarHelper {    
    /**
     * Google client instance.
     *
     * @var Client
     */
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setAuthConfig(storage_path('app/client_secret.json'));
        $this->client->setAccessType('offline');
        $this->client->setIncludeGrantedScopes(true);
        $this->client->setApprovalPrompt('force');
        $this->client->addScope(Google_Service_Calendar::CALENDAR);
        $this->client->setRedirectUri('http://localhost:4200/dashboard/oauth2callback');
    }
    
    /**
     * Get client.
     *
     * @return Client
     */
    public function getClient(): Client {
        return $this->client;
    }
    
    /**
     * Get events for next month
     *
     * @param  Client $client
     * @return array
     */
    public function getEventsForNextMonth(Client $client) {
        $calendar = new Google_Service_Calendar($client);
        $optParams = array(
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => Carbon::now()->toRfc3339String(),
            'timeMax' => Carbon::now()->addMonth()->toRfc3339String()
        );
        $events = $calendar->events->listEvents('primary', $optParams)->getItems();

        return $events;
    }
    
    /**
     * @param  Client $client
     * @return void
     */
    public function saveUserEvents(Client $client) {
        $events = $this->getEventsForNextMonth($client);

        foreach($events as $event) {
            if ($event->location) {
                $start = $event->start->dateTime || $event->start->date;
                $end = $event->end->dateTime || $event->end->date;
                GoogleCalendarEvents::create([
                    'user_id' => auth()->id(),
                    'start_at' => Carbon::createFromTimeString($start),
                    'end_at' => Carbon::createFromTimeString($end),
                    'location' => $event->location
                ]);
            }
        }
    }
}