// plugins/bootstrap.js
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
