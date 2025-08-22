import { resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const submitForm = (attrs) => {
  console.log("Form submitted with data:", (void 0).form);
  (void 0).$emit("toggle-modal", { name: "", open: false });
};
const _sfc_main = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ""
    },
    modalForm: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    submitForm
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_modalForm = resolveComponent("modalForm");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "modal",
    tabindex: "-1"
  }, _attrs))}><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${ssrInterpolate($props.title)}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><div class="row"><div class="col-12"> ?? `);
  if ($props.modalForm) {
    _push(ssrRenderComponent(_component_modalForm, {
      edit: $props.edit,
      onSubmit: $options.submitForm
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(` ??? </div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Close </button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Modal as default
};
