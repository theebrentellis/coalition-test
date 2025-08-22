<template>
  <div class="card shadow-sm">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center py-2">
        <h3 class="card-title mb-0">
          <i class="bi bi-list-task"></i>
          Tasks
        </h3>
        <button
          class="btn btn-primary btn-sm"
          @click="
            (e) =>
              emit('toggle-modal', {
                name: 'taskModal',
                open: true,
                clicker: e,
              })
          "
        >
          <i class="bi bi-plus-circle me-1"></i>
          Add Task
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <transition name="slide">
            <div class="row" v-show="projects.length > 0">
              <div class="col-12">
                <h5 class="mb-3">Filter Tasks by Project:</h5>
                <div
                  v-for="p in projects"
                  :key="`filter-project-${p.id}`"
                  :id="`filter-project-${p.id}-container`"
                  class="form-check form-check-inline"
                >
                  <input
                    type="checkbox"
                    :value="p.id"
                    :id="`filter-project-${p.id}`"
                    class="form-check-input"
                    @change="handleFilterChange"
                  />
                  <label :for="`filter-project-${p.id}`" class="form-label">
                    {{ p.name }}
                  </label>
                </div>
              </div>
            </div>
          </transition>
          <table class="table table-responsive table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Task Name</th>
                <th scope="col">Description</th>
                <th scope="col" style="width: 0%" class="text-center">
                  Project
                </th>
                <th scope="col" style="width: 0%" class="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <template v-if="displayTasks.length > 0">
              <draggable
                v-if="displayTasks.length > 0"
                :v-model="displayTasks"
                group="tasks"
                item-key="id"
                tag="tbody"
                @end="onEnd"
              >
                <tr
                  v-for="element in displayTasks"
                  :key="element.id"
                  style="vertical-align: middle"
                  class="drag-item draggable-item"
                >
                  <td>
                    <h6 class="mb-1">{{ element.name }}</h6>
                  </td>
                  <td>
                    <p class="mb-0 text-muted">{{ element.description }}</p>
                  </td>
                  <td class="text-center">
                    <span class="badge bg-secondary">
                      {{
                        projects.find((p) => p.id == element.project_id)
                          ?.name ?? ""
                      }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group" role="group">
                      <button
                        class="btn btn-sm btn-warning"
                        @click="editTask(element.id)"
                        :title="`Edit ${element.name}`"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        @click="deleteTask(element.id)"
                        :title="`Delete ${element.name}`"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- <template #item="{ element }">
                  <tr
                    :id="`${element.id}`"
                    style="vertical-align: middle"
                    class="drag-item draggable-item"
                  >
                    <td class="text-center">{{ element.id }}</td>
                    <td>
                      <h6 class="mb-1">{{ element.name }}</h6>
                    </td>
                    <td>
                      <p class="mb-0 text-muted">{{ element.description }}</p>
                    </td>
                    <td>
                      <span class="badge bg-secondary">
                        {{
                          projects.find((p) => p.id == element.project_id)
                            ?.name ?? ""
                        }}
                      </span>
                    </td>
                    <td class="text-center">
                      {{ element.priority }}
                    </td>
                    <td>
                      <div class="btn-group" role="group">
                        <button
                          class="btn btn-sm btn-warning"
                          @click="editTask(element.id)"
                          :title="`Edit ${element.name}`"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="deleteTask(element.id)"
                          :title="`Delete ${element.name}`"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template> -->
              </draggable>
            </template>
          </table>
          <div v-if="displayTasks.length === 0" class="text-center text-muted">
            <p>No tasks available. Please create a task.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { VueDraggableNext } from "vue-draggable-next";

const draggable = VueDraggableNext;

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
});

const filterProjects = ref([]);

const localItems = ref([]);

const displayTasks = computed({
  get() {
    return filterProjects.value.length === 0
      ? [...localItems.value].sort((a, b) => a.priority - b.priority)
      : [...localItems.value]
          .filter((t) => filterProjects.value?.includes(t.project_id))
          .sort((a, b) => a.priority - b.priority);
  },
  set(newValue) {
    localItems.value = newValue;
  },
});

const emit = defineEmits(["toggle-modal", "delete:task", "update:tasks"]);

const handleFilterChange = (event) => {
  const projectId = parseInt(event.target.value);
  if (event.target.checked) {
    filterProjects.value.push(projectId);
  } else {
    filterProjects.value = filterProjects.value.filter(
      (id) => id !== projectId
    );
  }
};

const editTask = (id) => {
  // Logic to edit task
  let editTask = props.tasks.find((t) => t.id === id);
  emit("toggle-modal", {
    name: "taskModal",
    task: editTask,
    open: true,
  });
};

const deleteTask = async (id) => {
  let res = {};

  try {
    res = await axios.delete(`/api/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }

  if (res.status === 204) {
    emit("delete:task", id);
  }
};

const handleReorder = async (oldIndex, newIndex) => {
  let updates = moveElement(displayTasks.value, oldIndex, newIndex);

  let updateTasks = [];

  updates = updates.map((task, index) => {
    updateTasks.push({
      id: task.id,
      priority: index + 1,
    });
    return { ...task, priority: index + 1 };
  });

  try {
    await axios.post("/api/tasks-update-priority", { tasks: updateTasks });
    emit("update:tasks", updates);
  } catch (error) {
    console.error("Error updating task priority:", error);
  }
};

const moveElement = (arr, fromIndex, toIndex) => {
  const element = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, element);
  return arr;
};

watch(
  [() => props.tasks, filterProjects],
  ([newTasks]) => {
    if (newTasks) {
      localItems.value = [...newTasks];
    }
  },
  { immediate: true, deep: true }
);

const onEnd = (event) => {
  if (event.oldIndex !== event.newIndex) {
    handleReorder(event.oldIndex, event.newIndex);
  }
};
</script>

<style scoped>
.drag-item {
  padding: 8px;
  margin: 4px 0;
  background: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: move;
}
</style>
