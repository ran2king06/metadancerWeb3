"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.router = void 0;

var _vueRouter = require("vue-router");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: [{
    path: '/',
    name: 'DashboardPage',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Dashboard.vue'));
      });
    },
    props: true
  }, {
    path: '/PlayDancer',
    name: 'Dancer',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/Dancer.vue'));
      });
    },
    props: true
  }, {
    path: '/PlayCoach',
    name: 'Coach',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/Coach.vue'));
      });
    },
    props: true
  }, {
    path: '/PlayCrew',
    name: 'Crew',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/Crew.vue'));
      });
    },
    props: true
  }, {
    path: '/CreateCrew',
    name: 'CreateCrew',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/CreateCrew.vue'));
      });
    },
    props: true
  }, {
    path: '/UpdateCrew',
    name: 'UpdateCrew',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/UpdateCrew.vue'));
      });
    },
    props: true
  }, {
    path: '/PlayBattle',
    name: 'Battle',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/Battle.vue'));
      });
    },
    props: true
  }, {
    path: '/BattleHistory',
    name: 'BattleHistory',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Play/BattleHistory.vue'));
      });
    },
    props: true
  }, {
    path: '/DancerMarket',
    name: 'DancerMarket',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Market/DancerMarket.vue'));
      });
    },
    props: true
  }, {
    path: '/CoachMarket',
    name: 'CoachMarket',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Market/CoachMarket.vue'));
      });
    },
    props: true
  }, {
    path: '/CrewMarket',
    name: 'CrewMarket',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./components/Market/CrewMarket.vue'));
      });
    },
    props: true
  }],
  scrollBehavior: function scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "instant"
      };
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }
  }
}); // router.beforeEach((to, from, next) => {
//   // console.log(`Navigating to: ${to.name}`);
//   // window.removeEventListener("resize", event);
//   // next();
// });

exports.router = router;
var _default = router;
exports["default"] = _default;