<template>
  <form :id="id" @submit.prevent="submitForm">
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column">
          <label class="form-label fw-bold">
            Task Name:<span class="text-danger">*</span>
          </label>
          <small class="text-danger mb-3" v-if="errors?.name?.length > 0">{{
            errors?.name.join(" ")
          }}</small>
          <input
            type="text"
            class="form-control"
            name="name"
            required
            max="255"
            placeholder="Enter task name"
            :value="edit?.name ?? task.name"
            @input="onInput($event, 'name')"
          />
        </div>
        <div class="mt-3">
          <label class="form-label fw-bold">Project:</label>
          <select
            class="form-select"
            name="project_id"
            :value="edit?.project_id ?? task.project_id"
            @change="onInput($event, 'project_id')"
          >
            <option value="" disabled>{{ projects.length > 0 ? 'Select a project' : 'Create new project first' }}</option>
            <option
              v-for="project in projects"
              :key="`option-${project.id}`"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
        <div class="mt-3">
          <label class="form-label fw-bold">Description:</label>
          <textarea
            class="form-control"
            rows="3"
            maxlength="500"
            placeholder="Enter task description (optional)"
            :value="edit?.description ?? task.description"
            @input="onInput($event, 'description')"
          ></textarea>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:task", "toggle-modal"]);

import axios from "axios";

const task = ref({});
const errors = ref({});

const props = defineProps({
  edit: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
});

const onInput = (event, field) => {
  task.value[field] = event.target.value;
};

const submitForm = async (e) => {
  e.preventDefault();
  // Logic to handle form submission

  let res,
    taskObj = {};

  Object.keys(task.value).forEach((key) => {
    taskObj[key] = task.value[key];
  });

  if (Object.values(props.edit).length === 0) {
    try {
      res = await axios.post("/api/tasks", taskObj);
    } catch (error) {
      errors.value = error.response?.data?.errors || {};
    }
  } else {
    try {
      res = await axios.put(`/api/tasks/${props.edit.id}`, taskObj);
    } catch (error) {
      console.error("Error updating task:", error);
      errors.value = error.response?.data?.errors || {};
    }
  }

  if (res?.data?.task) {
    emit("update:task", res.data.task);
    emit("toggle-modal", { name: "taskModal", open: false });
  }

  if (res?.data?.errors) {
    console.error("Validation errors:", res.data.errors);
    errors.value = res.data.errors;
  }
};
</script>
