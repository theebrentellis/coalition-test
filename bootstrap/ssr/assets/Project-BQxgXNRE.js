import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import axios from "axios";
const _sfc_main = {
  __name: "Project",
  __ssrInlineRender: true,
  emits: ["toggle-modal"],
  setup(__props, { emit: __emit }) {
    const projects = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get("/api/projects");
        projects.value = response.data?.projects || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card shadow-sm" }, _attrs))}><div class="card-header"><div class="d-flex justify-content-between align-items-center"><h5 class="card-title mb-0">Projects</h5><button class="btn btn-primary btn-sm"> Add Project </button></div></div><div class="card-body"><div class="row"><div class="col-12"><ul><!--[-->`);
      ssrRenderList(projects.value, (project) => {
        _push(`<li class="list-group-item d-flex justify-content-between align-items-center"><div><h6 class="mb-1">${ssrInterpolate(project.name)}</h6><p class="mb-0 text-muted">${ssrInterpolate(project.description)}</p></div><div><button class="btn btn-sm btn-secondary"> View </button><button class="btn btn-sm btn-warning"> Edit </button><button class="btn btn-sm btn-danger"> Delete </button></div></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Project.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
