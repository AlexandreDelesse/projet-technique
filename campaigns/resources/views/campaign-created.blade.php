@component('mail::message')

Hello {{ $notifiable->firstname }}, a new blood donating campaign nearby you :
<br>
<br>
<b>From :</b> {{ $campaign->start_at }}
<br>
<b>To :</b> {{ $campaign->end_at }}
<br>
<b>Adress :</b> {{ $campaign->location }}

@component('mail::button', ['url' => 'http://localhost:4200/campaigns/' . $campaign->slug ])
Sign-up
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent