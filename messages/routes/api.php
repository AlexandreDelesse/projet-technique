<?php

use App\Http\Controllers\MessagesController;
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
Route::get('/messages' , [MessagesController::class,'index']);
Route::get('/messages/{message}', [MessagesController::class,'show']);
Route::post('/messages',[MessagesController::class,'store']);
Route::patch('/messages/{message}', [MessagesController::class,'update']);
Route::delete('/messages/{message}',[MessagesController::class,'destroy']);
