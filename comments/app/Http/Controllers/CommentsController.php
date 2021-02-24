<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $comments = Comment::all();
        return $comments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateCommentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCommentRequest $request)
    {
        $data = $request->validated();
 
        return Comment::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        return $comment;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateCommentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $data = $request->validated();

        $comment->update($data);

        return $comment;
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return [
         'success' => 'Comment deleted successfully.'
               ];
    }
}
