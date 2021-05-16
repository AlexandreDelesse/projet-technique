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
        if(request()->has('start_at')) {
            $query->whereDate('start_at', '>=', request('start_at'));
        }
        if(request()->has('end_at')) {
            $query->orWhereDate('end_at', '<=', request('end_at'));
        }
        return $query;
    }
}
