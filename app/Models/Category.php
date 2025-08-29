<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Categories are seeded and don’t really change,
    // so we don’t need created_at / updated_at columns.
    public $timestamps = false;

    // Only these fields can be mass-assigned when seeding.
    protected $fillable = ['name','slug'];

     public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
    
}
