<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller {
    /*
     * Categories are predefined (seeded in DB).
     * Users can only read them (no create/update/delete endpoints).
     * This controller only returns a list of categories for filters in the frontend.
     */
    public function index() {
        // Just fetch all categories, sort by name for nicer UI dropdown,
        // and return only id, name, slug (we don’t expose unnecessary fields).
        return response()->json(
            Category::orderBy('name')->get(['id','name','slug'])
        );
    }
}
