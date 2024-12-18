import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ProjectView from "../views/ProjectView.vue";
import ProjectDashboard from "../views/ProjectDashboard.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/projects", name: "Projects", component: ProjectView },
  {
    path: "/projects/:id",
    name: "ProjectDetails",
    component: ProjectDashboard,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});