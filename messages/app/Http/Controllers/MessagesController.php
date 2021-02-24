<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Message;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
        return $messages;
    }

    /**
     * Show the form for creating a new resource.
     *

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateMessageRequest $request)
    {
        $data = $request->validated();
 
        return Message::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        return $message;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateMessageRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        $data = $request->validated();

        $message->update($data);

        return $message;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return [
         'success' => 'Message deleted successfully.'
               ];
    }
}
