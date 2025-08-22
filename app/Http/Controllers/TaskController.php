<?php

namespace App\Http\Controllers;

use App\Models\Task;

use Illuminate\Support\Facades\Artisan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();

        return response()->json(["tasks" => $tasks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'filled|exists:projects,id',
            'priority' => 'integer|min:1',
            'description' => 'nullable|string',
        ]);

        $task = Task::create($validated);

        return response()->json(['task' => $task], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::with('project')->findOrFail($id);

        return response()->json(['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'name' => 'filled|string|max:255',
            'project_id' => 'filled|exists:projects,id',
            'priority' => 'integer|min:1',
            'description' => 'nullable|string',
        ]);

        $task->update($validated);

        return response()->json(['task' => $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.'], 204);
    }

    /**
     * Update the priority of tasks.
     */
    public function updatePriority(Request $request)
    {
        $validated = $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|exists:tasks,id',
            'tasks.*.priority' => 'required|integer|min:1',
        ]);

        try {
            $items = $validated['tasks'];

            $ids = array_column($items, 'id');

            $cases = [];
            foreach ($items as $item) {
                $cases[] = "WHEN {$item['id']} THEN {$item['priority']}";
            }
            $caseSql = implode(' ', $cases);

            DB::update("UPDATE tasks SET `priority` = CASE id $caseSql END WHERE id IN (" . implode(',', $ids) . ")");

            return response()->json(['message' => 'Task priorities updated successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update task priorities.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Seed tasks for testing.
     */
    public function seedTasks(Request $request)
    {
        Artisan::call('db:seed', [
            '--class' => 'TaskSeeder',
        ]);

        return response()->json(['message' => 'Tasks seeded successfully.']);
    }
}
