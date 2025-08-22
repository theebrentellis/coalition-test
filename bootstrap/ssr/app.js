import axios from "axios";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
InertiaProgress.init();
createInertiaApp({
  resolve: (name) => {
    return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./Pages/Home.vue": () => import("./assets/Home-Bso7qlsz.js"), "./Pages/Modal.vue": () => import("./assets/Modal-n-UsQpyp.js"), "./Pages/Project.vue": () => import("./assets/Project-BQxgXNRE.js"), "./Pages/ProjectForm.vue": () => import("./assets/ProjectForm-ChQTgPGN.js"), "./Pages/Task.vue": () => import("./assets/Task-CSpmV3Jp.js"), "./Pages/TaskModal.vue": () => import("./assets/TaskModal-BmMf-Plc.js") }), `./Pages/${name}.vue`, 3).then((module) => module.default);
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) }).use(plugin).mount(el);
  }
});
