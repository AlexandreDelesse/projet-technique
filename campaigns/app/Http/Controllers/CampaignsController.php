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
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        $data = $request->validated();

        $data['slug'] = Str::slug($data['title']);

        $campaign = Campaign::create($data);

        return response()->json($campaign, 201);
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
