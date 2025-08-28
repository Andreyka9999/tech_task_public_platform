<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller 
{

    public function store(Request $request, Post $post) {

        $data = $request->validate([

            'body' => ['required','string'],
        ]);

        $comment = Comment::create([

            'body' => $data['body'],
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
        ]);

        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Request $request, Comment $comment) 
    {

        $this->authorize('delete', $comment);
        $comment->delete();
        
        return response()->noContent();

    }
}
