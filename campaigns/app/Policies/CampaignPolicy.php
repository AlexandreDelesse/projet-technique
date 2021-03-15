<?php

namespace App\Policies;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CampaignPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given campaigns can be managed by the user.
     * Only admin can manage Camapign
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Campaign|null  $campaign
     * @return bool
     */
    public function manage(User $user, ?Campaign $campaign)
    {
        return $user->isAdmin();
    }
}
