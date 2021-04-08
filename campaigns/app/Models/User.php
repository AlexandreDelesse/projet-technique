<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    /**
    * Determine if the current user is admin
    *
    * @return bool
    */
    public function isAdmin(): bool {
       return $this->type == 1;
    }

    /**
    * Determine if the current user is super admin
    *
    * @return bool
    */
    public function isSuperAdmin(): bool {
        return $this->type == 2;
    }

    public function adress() {
        return $this->belongsTo(Adress::class);
    }
}
