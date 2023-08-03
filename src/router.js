import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'DashboardPage',
      component: () => import('./components/Dashboard.vue'),
      props: true
    },
    {
      path: '/PlayDancer',
      name: 'Dancer',
      component: () => import('./components/Play/Dancer.vue'),
      props: true
    },
    {
      path: '/PlayCoach',
      name: 'Coach',
      component: () => import('./components/Play/Coach.vue'),
      props: true
    },
    {
      path: '/PlayCrew',
      name: 'Crew',
      component: () => import('./components/Play/Crew.vue'),
      props: true
    },
    {
      path: '/CreateCrew',
      name: 'CreateCrew',
      component: () => import('./components/Play/CreateCrew.vue'),
      props: true
    },
    {
      path: '/UpdateCrew',
      name: 'UpdateCrew',
      component: () => import('./components/Play/UpdateCrew.vue'),
      props: true
    },
    {
      path: '/PlayBattle',
      name: 'Battle',
      component: () => import('./components/Play/Battle.vue'),
      props: true
    },
    {
      path: '/BattleHistory',
      name: 'BattleHistory',
      component: () => import('./components/Play/BattleHistory.vue'),
      props: true
    },
    {
      path: '/DancerMarket',
      name: 'DancerMarket',
      component: () => import('./components/Market/DancerMarket.vue'),
      props: true
    },
    {
      path: '/CoachMarket',
      name: 'CoachMarket',
      component: () => import('./components/Market/CoachMarket.vue'),
      props: true
    },
    {
      path: '/CrewMarket',
      name: 'CrewMarket',
      component: () => import('./components/Market/CrewMarket.vue'),
      props: true
    },
  ],
  scrollBehavior: function (to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "instant" };
    } else {
      window.scrollTo({ top:0, left:0, behavior: "instant"})
    }
 }

});

// router.beforeEach((to, from, next) => {
//   // console.log(`Navigating to: ${to.name}`);
//   // window.removeEventListener("resize", event);
//   // next();
// });

export default router;

