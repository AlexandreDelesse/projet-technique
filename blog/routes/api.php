<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;

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
Route::get('/posts' , [PostsController::class,'index']);
Route::get('/posts/{post}', [PostsController::class,'show']);
Route::post('/posts',[PostsController::class,'store']);
Route::patch('/posts/{post}', [PostsController::class,'update']);
Route::delete('/posts/{post}',[PostsController::class,'destroy']);

/*
Route::get('/posts', 'PostsController@index')->name('posts.index');
Route::get('/posts/{post}', 'PostsController@show')->name('posts.show');
Route::post('/posts', 'PostsController@store')->name('posts.store');
Route::patch('/posts/{post}', 'PostsController@update')->name('posts.update');
Route::delete('/posts/{post}', 'PostsController@destroy')->name('posts.destroy');
*/

