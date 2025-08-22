<template>
  <form :id="id" @submit.prevent="submitForm">
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column">
          <label class="form-label fw-bold"
            >Project Name:<span class="text-danger">*</span></label
          >
          <small class="text-danger mb-3" v-if="errors?.name?.length > 0">{{
            errors?.name.join(" ")
          }}</small>
          <input
            type="text"
            class="form-control"
            name="name"
            required
            max="255"
            placeholder="Enter project name"
            :value="edit?.name ?? project.name"
            @input="onInput($event, 'name')"
          />
        </div>
        <div class="mt-3">
          <label class="form-label fw-bold">Description:</label>
          <textarea
            class="form-control"
            rows="3"
            placeholder="Enter project description (optional)"
            :value="edit?.description ?? project.description"
            @input="onInput($event, 'description')"
          ></textarea>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:project", "toggle-modal"]);

import axios from "axios";

const project = ref({});
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
});

const onInput = (event, field) => {
  project.value[field] = event.target.value;
};

const submitForm = async (e) => {
  e.preventDefault();
  // Logic to handle form submission

  let res,
    projectObj = {};

  Object.keys(project.value).forEach((key) => {
    projectObj[key] = project.value[key];
  });

  if (Object.values(props.edit).length === 0) {
    try {
      res = await axios.post("/api/projects", projectObj);
    } catch (error) {
      errors.value = error.response?.data?.errors || {};
    }
  } else {
    try {
      res = await axios.put(`/api/projects/${props.edit.id}`, projectObj);
    } catch (error) {
      console.error("Error updating project:", error);
      errors.value = error.response?.data?.errors || {};
    }
  }

  if (res?.data?.project) {
    emit("update:project", res.data.project);
    emit("toggle-modal", { name: "projectModal", open: false });
  }

  if (res?.data?.errors) {
    errors.value = res.data.errors;
  }
};
</script>

<style>
</style>
