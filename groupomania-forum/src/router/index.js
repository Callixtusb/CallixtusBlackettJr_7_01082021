/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    // path: '/user/:id',
    path: "/user",
    name: "Profile",
    component: () => import("../views/user.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },

  {
    path: "/Signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },

  {
    path: "/post/:id",
    name: "OnePost",
    component: () => import("../views/OnePost.vue"),
  },

  {
    path: "/update/:id",
    name: "Update",
    component: () => import("../views/Update.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
