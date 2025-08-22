<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', []);
});

Route::group(['prefix' => 'api'], function () {
    // Define your API routes here
    Route::apiResource('projects', 'App\Http\Controllers\ProjectController');
    Route::apiResource('tasks', 'App\Http\Controllers\TaskController');

    Route::post('tasks-update-priority', 'App\Http\Controllers\TaskController@updatePriority');

    Route::post('seed-tasks', 'App\Http\Controllers\TaskController@seedTasks');
    Route::post('seed-projects', 'App\Http\Controllers\ProjectController@seedProjects');
});
