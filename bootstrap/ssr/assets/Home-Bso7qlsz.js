import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import _sfc_main$1 from "./Project-BQxgXNRE.js";
import Task from "./Task-CSpmV3Jp.js";
import "./ProjectForm-ChQTgPGN.js";
import Modal from "./Modal-n-UsQpyp.js";
import "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const openModal = ref(null);
    const edit = ref({});
    ref({});
    const toggleModal = (modalType) => {
      switch (modalType.name) {
        case "projectModal":
          const { project } = modalType;
          console.log("Project data:", modalType);
          edit.value = project || {};
          if (modalType?.open) {
            openModal.value = modalType;
            openModal.value.name = "projectModal";
            document.body.classList.add("modal-open");
          } else {
            document.body.classList.remove("modal-open");
          }
          break;
        case "taskModal":
          break;
        default:
          console.error("Unknown modal type:", modalType.name);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container vh-100" }, _attrs))}><div class="row h-100 align-items-center"><div class="col-12"><div class="row"><div class="col-4">`);
      _push(ssrRenderComponent(_sfc_main$1, { onToggleModal: toggleModal }, null, _parent));
      _push(`</div><div class="col-8">`);
      _push(ssrRenderComponent(Task, null, null, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(Modal, {
        id: "appModal",
        show: openModal.value?.open,
        edit: openModal.value?.edit,
        "modal-form": openModal.value?.form,
        onToggleModal: toggleModal
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
