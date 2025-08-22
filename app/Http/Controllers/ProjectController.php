<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();

        return response()->json(["projects" => $projects]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:projects,name',
            'description' => 'nullable|string',
        ]);

        $project = Project::create($validatedData);

        return response()->json(["project" => $project], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::findOrFail($id);

        return response()->json(["project" => $project]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'filled|string|max:255|unique:projects,name,',
            'description' => 'nullable|string',
        ]);

        $project->update($validatedData);

        return response()->json(["project" => $project]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);

        if (Task::where('project_id', $project->id)->exists()) {
            return response()->json(['message' => 'Cannot delete project with associated tasks.'], 422);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted.'], 204);
    }

    /**
     * Seed projects.
     */
    public function seedProjects()
    {
        Artisan::call('db:seed', [
            '--class' => 'ProjectSeeder',
            '--force' => true,
        ]);

        return response()->json(['message' => 'Projects seeded successfully.']);
    }
}
