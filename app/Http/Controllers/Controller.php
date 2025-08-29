<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/*
  Base controller for the whole app.
  All other controllers extend this one.
*/

class Controller extends BaseController
{
    
    use AuthorizesRequests, ValidatesRequests;

}
