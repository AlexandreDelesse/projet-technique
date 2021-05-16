@component('mail::message')

Hello {{ $notifiable->firstname }}, a new blood donating campaign nearby you :
<br>
<br>
<b>From :</b> {{ $campaign->start_date }}
<br>
<b>To :</b> {{ $campaign->end_date }}
<br>
<b>Adress :</b> {{ $campaign->adress->label }}

@component('mail::button', ['url' => 'http://localhost:4200/campaigns/' . $campaign->slug ])
Sign-up
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent