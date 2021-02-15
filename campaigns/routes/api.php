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

Route::get('/campaigns', 'CampaignsController@index')->name('campaigns.index');
Route::get('/campaigns/{campaign}', 'CampaignsController@show')->name('campaigns.show');
Route::post('/campaigns', 'CampaignsController@store')->name('campaigns.store');
// Route::post('/campaigns', function() {
//     return auth()->user();
// });
Route::patch('/campaigns/{campaign}', 'CampaignsController@update')->name('campaigns.update');
Route::delete('/campaigns/{campaign}', 'CampaignsController@destroy')->name('campaigns.destroy');
