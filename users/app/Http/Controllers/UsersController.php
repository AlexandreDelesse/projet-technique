<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
       return $users;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $data = $request->validated();
 
        return User::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
    
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user ->firstname = $request-> firstname;
        $user ->lastname = $request-> lastname;
        $user ->birthdate = $request-> birthdate;
        $user ->adress = $request-> adress;
        $user ->phone = $request-> phone;
        $user ->type = $request-> type;
        $user ->gender = $request-> gender;
        $user ->avatar = $request-> avatar;
        $user ->email = $request-> email;
        if($user -> save())
        {
            return new $user;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
       $user->delete();
       return [
        'success' => 'User deleted successfully.'
              ];
    }
}
