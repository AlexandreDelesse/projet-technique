<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getRouteKeyName() {
        return 'slug';
    }

    public function path() {
        return '/campaigns/' . $this->slug;
    }
}
