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

    public function adress() {
        return $this->belongsTo(Adress::class);
    }

    public function file() {
        return $this->belongsTo(File::class);
    }
    
    public function users() {
        return $this->belongsToMany(User::class)->withPivot('date');
    }

    /**
     * Filter campaigns.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilter($query)
    {
        if(request()->has('city')) {
            $query->whereHas('adress', function($query2) {
                $query2->where('city', request('city'));
            });
        }
        if(request()->has('start_date')) {
            $query->whereDate('start_date', '>=', request('start_date'));
        }
        if(request()->has('end_date')) {
            $query->orWhereDate('end_date', '<=', request('end_date'));
        }
        return $query;
    }
}
