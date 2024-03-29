import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AdminHome from './views/AdminHome.vue';
import AdminSplathonEventHome from './views/admin/splathon/Event.vue';
import AdminSplathonReception from './views/admin/splathon/Reception.vue';
import AdminSplathonNotices from './views/admin/splathon/Notices.vue';
import AdminSplathonTournament from './views/admin/splathon/Tournament.vue';
import AdminSplathonQualifier from './views/admin/splathon/Qualifier.vue';
import AdminSplathonSchedule from './views/admin/splathon/Schedule.vue';
import AdminSplathonRanking from './views/admin/splathon/Ranking.vue';
import Login from '@/components/Login/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminHome,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: Login,
    },
    {
      path: '/admin/splathon/:event_numbering',
      name: 'admin-splathon-event-home',
      component: AdminSplathonEventHome,
      children: [
        {
          path: 'reception',
          name: 'admin-splathon-event-reception',
          component: AdminSplathonReception,
        },
        {
          path: 'notices',
          name: 'admin-splathon-event-notices',
          component: AdminSplathonNotices,
        },
        {
          path: 'tournament',
          name: 'admin-splathon-event-tournament',
          component: AdminSplathonTournament,
        },
        {
          path: 'qualifier',
          name: 'admin-splathon-event-qualifier',
          component: AdminSplathonQualifier,
        },
        {
          path: 'schedule',
          name: 'admin-splathon-event-schedule',
          component: AdminSplathonSchedule,
        },
        {
          path: 'ranking',
          name: 'admin-splathon-event-ranking',
          component: AdminSplathonRanking,
        },
      ],
    },
  ],
});
