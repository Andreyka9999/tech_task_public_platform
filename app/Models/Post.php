<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Fields that can be filled via mass-assignment (safe to accept from request)
    protected $fillable = ['title','content','user_id'];

    // Always eager-load these relations by default,
    // so we don’t have N+1 problems when showing posts
    protected $with = ['author','categories'];

    /*
     * Relation: each post belongs to one user (the author).
     * We store the author id in "user_id".
     */
    public function author()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /*
     * Relation: post can have many categories (many-to-many).
     * Pivot table: category_post
     */
     public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /*
     * Relation: one post can have many comments.
     * ->latest() makes sure we always get newest comments first.
     */
     public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
    
}
