const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: () => import("@/views/home.vue") },
  // { path: "/login", component: () => import("@/views/login.vue") },
  { path: "/about", component: About },
];

export default routes;
