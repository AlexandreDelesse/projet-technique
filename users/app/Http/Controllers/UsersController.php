<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
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
        return $users->load("adress");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
<<<<<<< HEAD
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
       
=======
>>>>>>> 5eff1a2fccab608a9086b9ac941c56ecc7a870a3
        $data = $request->validated();
 
        return User::create($data)->load("adress");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
    
        return $user->load("adress");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateUserRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        $data = $request->validated();

        $user->update($data);

        return $user->load("adress");
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
       $user->delete();
       return [
           'success' => 'User deleted successfully.'
        ];
    }
}
