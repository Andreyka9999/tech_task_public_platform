<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title','content','user_id'];

    protected $with = ['author','categories'];

    public function author()
    {
        return $this->belongsTo(User::class,'user_id');
    }

     public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

     public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
    
}
