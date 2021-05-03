@component('mail::message')

Bonjour {{ $notifiable->firstname }}, voici la confirmation de votre rendez-vous :
<br>
<br>
<b>Le :</b> {{ $date }}
<br>
<b>Adresse :</b> {{ $campaign->adress->label }}
<br>
<br>
Vous pouvez gérer vos rendez-vous dans votre tableau de bord.
@component('mail::button', ['url' => 'http://localhost:4200/dashboard/'])
Tableau de bord
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent