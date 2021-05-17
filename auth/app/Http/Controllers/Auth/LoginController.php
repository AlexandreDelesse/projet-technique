<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Kong;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        // Add consumer
        Kong::createConsumer($request->email, (string) $request->user()->id);
        // Check if user has key already
        $response = Kong::getConsumerKeys($request->email);
        if ($response->status() === 200 && count($response['data'])) {
            $key = $response['data'][0]['key'];
        } else {
            $key = Kong::generatekey($request->email)['key'];
        }

        return response()->json([
            'message' => 'Successfully logged in.',
            'key' => $key,
            'user' => $request->user()->refresh()->load(['campaigns', 'adress'])
        ], 201);
    }
}
