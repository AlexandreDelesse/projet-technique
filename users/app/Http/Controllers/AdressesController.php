<?php

namespace App\Http\Controllers;

use App\Models\Adress;
use App\Models\User;
use Illuminate\Http\Request;

class AdressesController extends Controller
{
    public function update(User $user) {
        $data = request()->validate([
            'label' => 'required|string',
            'name' => 'required|string',
            'postcode' => 'required|alpha_num',
            'city' => 'required|string',
            'street' => 'required|string',
            'importance' => 'required|numeric',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
        ]);

        $adress = Adress::create($data);

        $user->update([
            'adress_id' => $adress->id
        ]);

        return $user;
    }
}
