"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.router=void 0;var _vueRouter=require("vue-router");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return _getRequireWildcardCache=function(){return e},e}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;if(null===e||"object"!==_typeof(e)&&"function"!=typeof e)return{default:e};var r=_getRequireWildcardCache();if(r&&r.has(e))return r.get(e);var t,n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e){Object.prototype.hasOwnProperty.call(e,u)&&((t=o?Object.getOwnPropertyDescriptor(e,u):null)&&(t.get||t.set)?Object.defineProperty(n,u,t):n[u]=e[u])}return n.default=e,r&&r.set(e,n),n}var router=(0,_vueRouter.createRouter)({history:(0,_vueRouter.createWebHashHistory)(),routes:[{path:"/",name:"DashboardPage",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Dashboard.vue"))})},props:!0},{path:"/PlayDancer",name:"Dancer",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/Dancer.vue"))})},props:!0},{path:"/PlayCoach",name:"Coach",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/Coach.vue"))})},props:!0},{path:"/PlayCrew",name:"Crew",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/Crew.vue"))})},props:!0},{path:"/CreateCrew",name:"CreateCrew",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/CreateCrew.vue"))})},props:!0},{path:"/UpdateCrew",name:"UpdateCrew",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/UpdateCrew.vue"))})},props:!0},{path:"/PlayBattle",name:"Battle",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/Battle.vue"))})},props:!0},{path:"/BattleHistory",name:"BattleHistory",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Play/BattleHistory.vue"))})},props:!0},{path:"/DancerMarket",name:"DancerMarket",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Market/DancerMarket.vue"))})},props:!0},{path:"/CoachMarket",name:"CoachMarket",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Market/CoachMarket.vue"))})},props:!0},{path:"/CrewMarket",name:"CrewMarket",component:function(){return Promise.resolve().then(function(){return _interopRequireWildcard(require("./components/Market/CrewMarket.vue"))})},props:!0}],scrollBehavior:function(e,r,t){return t||(e.hash?{el:e.hash,behavior:"instant"}:void window.scrollTo({top:0,left:0,behavior:"instant"}))}}),_default=exports.router=router;exports.default=router;