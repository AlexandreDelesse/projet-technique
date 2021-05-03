<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Http\Requests\CreateCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Models\Adress;
use App\Models\User;
use App\Notifications\CampaignCreated;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Notification;

class CampaignsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Campaign::filter()->latest()->with(['adress', 'file'])->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateCampaignRequest  $request
     * @return \App\Models\Campaign 
     */
    public function store(CreateCampaignRequest $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $data = $request->validated();  

        $adress = Adress::firstOrCreate(
            ['label' => $data['adress']['label']], 
            [
                'name' => $data['adress']['name'],
                'postcode' => $data['adress']['postcode'],
                'city' => $data['adress']['city'],
                'street' => $data['adress']['street'],
                'importance' => $data['adress']['importance'],
                'x' => $data['adress']['x'],
                'y' => $data['adress']['y'],
            ]
        );

        $campaign = Campaign::create([
            'slug' => Str::slug($data['title']),
            'title' => $data['title'],
            'description' => $data['description'],
            'capacity' => $data['capacity'],
            'start_at' => $data['start_at'],
            'end_at' => $data['end_at'],
            'adress_id' => $adress->id,
            'file_id' => $data['file_id']
        ]);

        Notification::send(
            User::whereHas('adress', function($query) use ($campaign) {
                $query->where('city', $campaign->adress->city);
            })->get(), 
            new CampaignCreated($campaign)
        );

        return response()->json($campaign->load(['adress', 'file']), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \App\Models\Campaign  
     */
    public function show(Campaign $campaign)
    {
        return $campaign->load(['file', 'adress', 'users.bloodgroup']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\CreateCampaignRequest  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \App\Models\Campaign 
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        $data = $request->validated();

        $campaign->update($data);

        return $campaign;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        $campaign->delete();

        return [
            'success' => 'Campaign deleted successfully.'
        ];
    }
}
