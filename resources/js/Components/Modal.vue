<template>
  <div class="modal fade" :id="id" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <component
                :id="key"
                :key="key"
                v-if="modalForm && typeof modalForm === 'object'"
                :is="modalForm"
                :edit="edit ?? { test: true }"
                :projects="projects"
                :modelName="modalName"
                @update:project="$emit('update:project', $event)"
                @update:task="$emit('update:task', $event)"
                @toggle-modal="$emit('toggle-modal', $event)"
              />
              <template v-else>
                <p>No form available.</p>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            Cancel
          </button>
          <button type="type" :form="key" class="btn btn-primary">
            <i class="bi bi-floppy me-2"></i>Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Modal as BootstrapModal } from "bootstrap";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
    modalName: {
      type: String,
      default: "",
    },
    modalForm: {
      type: [Object, Function],
    },
    projects: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
  emits: ["update:project", "toggle-modal"],
  setup(props, { emit }) {
    const modalInstance = ref(null);

    const key = "form-" + Math.random().toString(36).substr(2, 9);

    onMounted(() => {
      const el = document.getElementById(props.id);
      modalInstance.value = new BootstrapModal(el, {});
      if (props.show) modalInstance.value.show();
    });

      const hideModal = (modalInstance) => {
        modalInstance.value.hide()
    };

    watch(
      () => props.show,
        (val) => {
        if (!modalInstance.value) return;
        val ? modalInstance.value.show() : hideModal(modalInstance);
      }
    );

    const close = async () =>
      emit("toggle-modal", { name: props.modalName, open: false });

    return { close, key };
  },
};
</script>

<style>
</style>
