<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\NewsApi\GuardianNewsController;
use App\Http\Controllers\NewsApi\NewsBusiness;
use App\Http\Controllers\NewsApi\NewsTechnology;
use App\Http\Controllers\NewsApi\NewsScience;
use App\Http\Controllers\NewsApi\NewsSport;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/fetch-news', [NewsBusiness::class, 'fetchNews']);
Route::get('/fetch-guardians-news', [GuardianNewsController::class, 'fetchGuardiansNews']);
Route::get('/fetch-technology-news', [NewsTechnology::class, 'fetchTechnologyNews']);
Route::get('/fetch-science-news', [NewsScience::class, 'fetchScienceNews']);
Route::get('/fetch-sport-news', [NewsSport::class, 'fetchSportNews']);
