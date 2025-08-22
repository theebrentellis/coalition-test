import './bootstrap';
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Tooltip } from 'bootstrap';

function initTooltips() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
        console.log('Initializing tooltip for:', el);
        new Tooltip(el);
    });
}

InertiaProgress.init()

createInertiaApp({
    resolve: (name) => {
        return import(`./Pages/${name}.vue`).then(module => module.default)
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el)
    },
})

import { Inertia } from '@inertiajs/inertia';

Inertia.on('navigate', () => {
    initTooltips();
});
