<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Http\Requests\CreateCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use Illuminate\Support\Str;

class CampaignsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Campaign::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateCampaignRequest  $request
     * @return \App\Models\Campaign 
     */
    public function store(CreateCampaignRequest $request)
    {
        return request()->headers;
        $data = $request->validated();

        $data['slug'] = Str::slug($data['title']);

        $campaign = Campaign::create($data);

        return $campaign;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \App\Models\Campaign  
     */
    public function show(Campaign $campaign)
    {
        return $campaign;
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
        $campaign->delete();

        return [
            'success' => 'Campagne deleted successfully.'
        ];
    }
}
