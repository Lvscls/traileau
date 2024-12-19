import {createRouter, createWebHistory} from "vue-router";
import LoginView from "../views/LoginView.vue";
import ProjectView from "../views/ProjectView.vue";
import ProjectDashboard from "../views/ProjectDashboard.vue";
import RegisterView from "../views/RegisterView.vue";
import useUserStore from "../store/userStore";
import EditProject from "../components/EditProject.vue";

const routes = [
    {path: "/", name: "Login", component: LoginView},
    {path: "/register", name: "Register", component: RegisterView},
    {
        path: "/projects",
        name: "Projects",
        component: ProjectView,
        meta: {requiresAuth: true}, //route protégée
    },
    {
        path: "/projects/:id",
        name: "ProjectDetails",
        component: ProjectDashboard,
        meta: {requiresAuth: true}, //route protégée
    },
    {
        path: "/projects/:id/edit",
        name: "EditProject",
        component: EditProject,
        meta: {requiresAuth: true}, //route protégée
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.currentUser) {
        next({name: "Login"}); //On redirige sur l'accueil si pas connecté
    } else {
        next();
    }
});

export default router;
