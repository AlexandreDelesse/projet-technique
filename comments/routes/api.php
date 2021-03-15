<?php
use App\Http\Controllers\CommentsController;
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

Route::get('/comments' , [CommentsController::class,'index']);
Route::get('/comments/{comment}', [CommentsController::class,'show']);
Route::post('/comments',[CommentsController::class,'store']);
Route::patch('/comments/{comment}', [CommentsController::class,'update']);
Route::delete('/comments/{comment}',[CommentsController::class,'destroy']);
