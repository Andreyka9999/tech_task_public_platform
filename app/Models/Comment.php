<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    // These fields can be mass assigned when creating/updating a comment
    protected $fillable = ['body','user_id','post_id'];

    /*
     * Relation: comment belongs to a user.
     * We call it "author" for nicer naming in API responses.
     */
    public function author()
    {
        return $this->belongsTo(User::class,'user_id');
    }

     /*
     * Relation: comment belongs to one post.
     * So we can easily load all comments for a post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    
}
