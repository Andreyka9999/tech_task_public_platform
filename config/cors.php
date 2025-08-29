<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    | Documentation: https://laravel.com/docs/cors
    */

    // Paths to which CORS applies
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user'],

    // Permitted HTTP methods
    'allowed_methods' => ['*'],

    // Permitted sources
    'allowed_origins' => [
        'http://localhost:4200',
        'http://127.0.0.1:4200',
    ],

    // Source patterns (usually not needed)
    'allowed_origins_patterns' => ['/^http:\/\/127\.0\.0\.1(:\d+)?$/'],

    // Permitted headings
    'allowed_headers' => ['*'],

    // ‘Exposed’ headlines
    'exposed_headers' => [],

    // Preflight caching time (OPTIONS) in seconds
    'max_age' => 0,

    // Are cookies/credentials required (false for Bearer tokens)
    'supports_credentials' => false,

];
