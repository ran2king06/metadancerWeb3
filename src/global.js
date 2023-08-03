import Vue from 'vue';

const components = {
  'modalLoadingComponent':   () => import('./components/modal/ModalLoadingGlobal'),
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
