<template>
  <div class="container" style="margin-bottom: 10em">
    <div class="row">
      <div class="col-12 my-5">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
          <div class="container-fluid py-2">
            <div class="row">
              <div class="col-12">
                <h1 class="display-5 fw-bold">
                  Coalition Technologies Laravel Skills Test
                </h1>
                <p class="fs-5">Laravel 12, Vue 3, Bootstrap 5</p>
              </div>
            </div>

            <hr />
            <div class="row">
              <div class="col-12">
                <div class="row align-items-center">
                  <div class="col-12 col-md-3">
                    <p>
                      <span class="fs-4 text-decoration-underline">
                        Projects
                      </span>
                    </p>
                    <ul>
                      <li>List Projects</li>
                      <li>Create Project</li>
                      <li>Edit Project</li>
                      <li>Delete Project</li>
                    </ul>
                  </div>
                  <div class="col-12 col-md-9">
                    <p>
                      Projects can be created, edited, and deleted. Each project
                      has a name and description. There is unique validation on
                      the project name. You cannot delete a project that has
                      tasks associated with it.
                      <br />
                      Carret to the right of project name will expand the
                      project to show the description.
                    </p>
                    <p>
                      <button class="btn btn-secondary" @click="seedProjects">
                        <i class="bi bi-database-add"></i>
                        Seed Projects
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div class="row">
              <div class="col-12">
                <div class="row align-items-center">
                  <div class="col-12 col-md-3">
                    <p>
                      <span class="fs-4 text-decoration-underline">Tasks</span>
                    </p>
                    <ul>
                      <li>List Tasks</li>
                      <li>Create Task</li>
                      <li>Edit Task</li>
                      <li>Delete Task</li>
                    </ul>
                  </div>
                  <div class="col-12 col-md-9">
                    <p>
                      Tasks can be created, edited, and deleted. Each task has a
                      name, description, and priority. Tasks can be assigned to
                      a project.
                      <br />
                      Tasks can be filtered by project.
                      <br />
                      Tasks can be reordered by dragging and dropping.
                    </p>
                    <p>
                      <button class="btn btn-secondary" @click="seedTasks">
                        <i class="bi bi-database-add"></i>
                        Seed Tasks
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3">
            <Project
              :projects="projects"
              @toggle-modal="toggleModal"
              @update:project="updateProject"
              @delete:project="deleteProject"
            />
          </div>
          <div class="col-12 col-md-8 col-lg-9">
            <Task
              :tasks="tasks"
              :projects="projects"
              @update:task="updateTask"
              @update:tasks="updateTasks"
              @delete:task="deleteTask"
              @toggle-modal="toggleModal"
            />
          </div>
        </div>
      </div>
    </div>
    <Modal
      :id="'appModal'"
      :title="openModal?.title ?? ''"
      :show="openModal?.open ?? false"
      :edit="openModal?.edit ?? {}"
      :modalForm="openModal?.modalForm ?? null"
      :modalName="openModal?.modalName ?? ''"
      :projects="projects"
      @toggle-modal="toggleModal"
      @update:project="updateProject"
      @update:task="updateTask"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from "vue";

import Project from "../Components/Project.vue";
import Task from "../Components/Task.vue";
import Modal from "../Components/Modal.vue";
import ProjectForm from "../Components/ProjectForm.vue";
import TaskForm from "../Components/TaskForm.vue";

const openModal = ref({});

const projects = ref([]);
const tasks = ref([]);

onMounted(async () => {
  try {
    const projectsRequest = await axios.get("/api/projects");
    projects.value = projectsRequest.data?.projects || [];

    const tasksRequest = await axios.get("/api/tasks");
    tasks.value = tasksRequest.data?.tasks || [];
  } catch (error) {
    console.error("Error fetching projects:", error, this.tasks, this.projects);
  }
});

const toggleModal = (modalType) => {
  // Logic to open modal based on type
  openModal.value.modalName = modalType.name;

  switch (modalType.name) {
    case "projectModal":
      const { project } = modalType;
      openModal.value.edit = project ?? {};
      // Logic to open project modal
      if (modalType?.open) {
        openModal.value.title = project ? "Edit Project" : "Add New Project";
        openModal.value.modalForm = markRaw(ProjectForm);
        openModal.value.open = true;
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
        openModal.value = { open: false };
      }
      break;
    case "taskModal":
      // Logic to open task modal
      const { task } = modalType;
      openModal.value.edit = task ?? {};
      // Logic to open project modal
      if (modalType?.open) {
        openModal.value.title = task ? "Edit Task" : "Add New Task";
        openModal.value.open = true;
        openModal.value.modalForm = markRaw(TaskForm);
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
        openModal.value.open = false;
        openModal.value.modalForm = null;
        openModal.value.title = null;
      }
      break;
    default:
      console.error("Unknown modal type:", modalType.name);
  }
};

const seedProjects = async (e) => {
  try {
    await axios.post("/api/seed-projects");
    const projectsRequest = await axios.get("/api/projects");
    projects.value = projectsRequest.data?.projects || [];

    let alertDiv = document.createElement("span");
    alertDiv.className = "alert alert-success p-2 ms-2";
    alertDiv.textContent = "Projects seeded!";

    e.target.insertAdjacentElement("afterend", alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  } catch (error) {
    console.error("Error seeding projects:", error);
  }
};

const updateProject = async (project) => {
  // Logic to update project in the list
  const index = projects.value.findIndex((p) => p.id === project.id);
  if (index !== -1) {
    projects.value[index] = project;
  } else {
    projects.value.push(project);
  }
};

const deleteProject = async (id) => {
  projects.value = projects.value.filter((project) => project.id !== id);
};

const seedTasks = async (e) => {
  console.log(e);
  try {
    await axios.post("/api/seed-tasks");
    const tasksRequest = await axios.get("/api/tasks");
    tasks.value = tasksRequest.data?.tasks || [];

    let alertDiv = document.createElement("span");
    alertDiv.className = "alert alert-success p-2 ms-2";
    alertDiv.textContent = "Tasks seeded!";

    e.target.insertAdjacentElement("afterend", alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  } catch (error) {
    console.error("Error seeding tasks:", error);
  }
};

const updateTask = async (task) => {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value[index] = task;
  } else {
    tasks.value.push(task);
  }
};

const updateTasks = async (updatedTasks) => {
  tasks.value = updatedTasks;
};

const deleteTask = async (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};
</script>
