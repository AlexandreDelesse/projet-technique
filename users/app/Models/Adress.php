<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adress extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function adress() {
        return $this->belongsTo(Adress::class);
    }
}
