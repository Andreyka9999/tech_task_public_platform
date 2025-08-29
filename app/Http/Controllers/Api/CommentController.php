<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller 
{

    /*
     * Controller for post comments.
     * Rules from task:
       - Only logged-in users can create comments
       - Only comment owner can delete them (handled by CommentPolicy)
     */

    public function store(Request $request, Post $post) {

        // Validate incoming text (basic string, required)
        $data = $request->validate([

            'body' => ['required','string'],
        ]);

        // Create a new comment linked to post + current user
        // We never trust client to send user_id
        $comment = Comment::create([

            'body' => $data['body'],
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
        ]);

        // Wrap response in resource for consistent JSON format
        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Request $request, Comment $comment) 
    {

        // Only the author of the comment can remove it (checked by policy)
        $this->authorize('delete', $comment);

        // Just delete and return 204 (no content)
        $comment->delete();
        return response()->noContent();

    }
}
