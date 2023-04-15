<?php

use App\Http\Controllers\GuardianNewsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Your existing routes...

// Add the following route for the fetchNews method
Route::get('/fetch-news', [NewsController::class, 'fetchNews']);
Route::get('/fetch-guardians-news', [GuardianNewsController::class, 'fetchGuardiansNews']);
