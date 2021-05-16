<?php

use Illuminate\Support\Facades\Http;
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

Route::get('/campaigns', 'CampaignsController@index')->name('campaigns.index');
Route::get('/campaigns/{campaign}', 'CampaignsController@show')->name('campaigns.show');
Route::post('/campaigns', 'CampaignsController@store')->name('campaigns.store');
Route::patch('/campaigns/{campaign}', 'CampaignsController@update')->name('campaigns.update');
Route::delete('/campaigns/{campaign}', 'CampaignsController@destroy')->name('campaigns.destroy');

Route::get('/appointments', 'AppointementsController@index')->name('apointments.index');
Route::post('/campaigns/{campaign}/appointements', 'AppointementsController@store')->name('appointments.store');
Route::delete('/campaigns/{campaign}/appointments/{user}', 'AppointementsController@destroy')->name('appointments.destroy');

Route::post('/files', 'FilesController@store')->name('files.store');

Route::get('google-calendar/auth-url', 'GCOAuth2Controller@authUrl')->name('gc.auth-url');
Route::get(
    'google-calendar/oauth2callback', 
    'GCOAuth2Controller@oauth2callback'
    )->name('gc.oauth2callback');

Route::get('/init-gateway', function() {
    echo Http::post('http://kong:8001/routes/campaigns.store/plugins', [
        'name' => 'key-auth',
        'config' => [
            'key_names' => ['apiKey']
        ]
    ]);
    echo Http::post('http://kong:8001/routes/files.store/plugins', [
        'name' => 'key-auth',
        'config' => [
            'key_names' => ['apiKey']
        ]
    ]);
    echo Http::post('http://kong:8001/routes/campaigns.update/plugins', [
        'name' => 'key-auth',
        'config' => [
            'key_names' => ['apiKey']
        ]
    ]);
    echo Http::post('http://kong:8001/routes/campaigns.destroy/plugins', [
        'name' => 'key-auth',
        'config' => [
            'key_names' => ['apiKey']
        ]
    ]);
    return;
});
