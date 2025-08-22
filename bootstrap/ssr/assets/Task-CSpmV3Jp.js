import { mergeProps, ref, onMounted, useSSRContext } from "vue";
import axios from "axios";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const tasks = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("/api/tasks");
    tasks.value = response.data?.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});
const viewTask = (id) => {
  console.log("View task:", id);
};
const editTask = (id) => {
  console.log("Edit task:", id);
};
const deleteTask = async (id) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    tasks.value = tasks.value.filter((task) => task.id !== id);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
const _sfc_main = {
  setup() {
    return {
      tasks,
      viewTask,
      editTask,
      deleteTask
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card shadow-sm" }, _attrs))}><div class="card-header"><div class="d-flex justify-content-between align-items-center"><h5 class="card-title mb-0">Tasks</h5><button class="btn btn-primary btn-sm">Add Task</button></div></div><div class="card-body"><div class="row"><div class="col-12"><table class="table table-striped table-bordered"><thead><tr><th scope="col">Task Name</th><th scope="col">Description</th><th scope="col">Actions</th></tr></thead><tbody><!--[-->`);
  ssrRenderList($setup.tasks, (task) => {
    _push(`<tr class="list-group-item d-flex justify-content-between align-items-center"><td><h6 class="mb-1">${ssrInterpolate(task.name)}</h6></td><td><p class="mb-0 text-muted">${ssrInterpolate(task.description)}</p></td><td><button class="btn btn-sm btn-secondary"> View </button><button class="btn btn-sm btn-warning"> Edit </button><button class="btn btn-sm btn-danger"> Delete </button></td></tr>`);
  });
  _push(`<!--]--></tbody></table></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Task.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Task = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Task as default
};
