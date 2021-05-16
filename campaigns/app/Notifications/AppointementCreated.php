<?php

namespace App\Notifications;

use App\Models\Campaign;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointementCreated extends Notification
{
    use Queueable;

    protected $campaign;
    protected $date;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Campaign $campaign, string $date)
    {
        $this->campaign = $campaign;
        $this->date = $date;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Votre confirmation de rendez-vous')
                    ->markdown('appointment-created', [
                        'campaign' => $this->campaign,
                        'date' => $this->date,
                        'notifiable' => $notifiable
                    ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
