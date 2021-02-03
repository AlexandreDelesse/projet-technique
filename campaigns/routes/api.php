<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/campaigns', 'CampaignsController@index')->name('campaigns.index');
Route::post('/campaigns', function() {
    return request()->headers;
});
Route::get('/campaigns/{campaign}', 'CampaignsController@show')->name('campaigns.show');
// Route::post('/campaigns', 'CampaignsController@store')->name('campaigns.store');
Route::patch('/campaigns/{campaign}', 'CampaignsController@update')->name('campaigns.update');
Route::delete('/campaigns/{campaign}', 'CampaignsController@destroy')->name('campaigns.destroy');
