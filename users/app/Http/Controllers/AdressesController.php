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

        $adress = Adress::firstOrCreate(
            ['label' => $data['label']], 
            [
                'name' => $data['name'],
                'postcode' => $data['postcode'],
                'city' => $data['city'],
                'street' => $data['street'],
                'importance' => $data['importance'],
                'x' => $data['x'],
                'y' => $data['y'],
            ]
        );

        $user->update([
            'adress_id' => $adress->id
        ]);

        return $user->load("adress");
    }
}
