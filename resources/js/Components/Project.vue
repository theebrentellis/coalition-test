<template>
  <div class="card shadow-sm">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center py-2">
        <h3 class="card-title mb-0">
          <i class="bi bi-kanban"></i>
          Projects
        </h3>
        <button
          class="btn btn-primary btn-sm"
          @click="
            emit('toggle-modal', {
              name: 'projectModal',
              open: true,
            })
          "
        >
          <i class="bi bi-plus-circle me-1"></i>
          Add Project
        </button>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="row">
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li
              v-for="project in projects"
              :id="`project-li-${project.id}`"
              :key="`project-li-${project.id}`"
              class="ct-list-group item list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="col">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <h5 class="mb-0">{{ project.name }}</h5>
                    <button
                      class="btn btn-link text-reset p-0 mx-2"
                      @click="viewProject(project.id)"
                      :title="`View ${project.name}`"
                    >
                      <i
                        :class="{
                          bi: true,
                          'bi-caret-right-fill': !toggle[project.id],
                          'bi-caret-down-fill': toggle[project.id],
                        }"
                      ></i>
                    </button>
                  </div>
                  <transition name="slide">
                    <small
                      v-show="toggle[project.id] ?? false"
                      class="text-muted mt-2 me-1"
                    >
                      <i class="bi bi-info-circle"></i>
                      {{ project.description }}
                    </small>
                  </transition>
                  <transition name="slide">
                    <small
                      v-show="validation[project.id] ?? false"
                      class="text-danger"
                    >
                      Error deleting project.
                    </small>
                  </transition>
                </div>
              </div>
              <div class="col-auto">
                <div class="btn-group" role="group">
                  <button
                    class="btn btn-sm btn-warning"
                    @click="editProject(project.id)"
                    :title="`Edit ${project.name}`"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteProject(project.id)"
                    :title="`Delete ${project.name}`"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="projects.length === 0" class="text-center text-muted mt-3">
            <p>No projects available. <br />Please create a project.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["toggle-modal", "delete:project"]);

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

const toggle = ref({});
const validation = ref({});

const viewProject = (id) => {
  toggle.value[id] = !toggle.value[id];
};

const editProject = (id) => {
  let editProject = props.projects.find((project) => project.id === id);
  emit("toggle-modal", {
    name: "projectModal",
    project: editProject,
    open: true,
  });
};

const deleteProject = async (id) => {
  let res = {};
  try {
    res = await axios.delete(`/api/projects/${id}`);
  } catch (error) {
    if (error.status === 422) {
      console.error("Cannot delete project with associated tasks.");

      const element = document.getElementById("project-li-" + id);

      element.classList.add("bg-danger-subtle");

      validation.value[id] = true;

      setTimeout(() => {
        element.classList.remove("bg-danger-subtle");
        validation.value[id] = false;
      }, 3000);
    }
  }

  if (res.status === 204) {
    emit("delete:project", id);
  }
};
</script>

<style>

</style>
