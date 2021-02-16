import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import { baseApiUrl } from "@/global";

import Home from "@/components/home/Home";
import Dashboard from "@/components/dashboard/Dashboard";
import AdminPages from "@/components/admin/AdminPages";
import Auth from "@/components/auth/Auth";
import Exam from "@/components/exams/Exam";
import Done from "@/components/exams/Done";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresLogin: true },
  },
  {
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
    meta: { requiresLogin: true },
  },
  {
    name: "auth",
    path: "/auth",
    component: Auth,
  },
  {
    name: "exam",
    path: "/exam/:id",
    component: Exam,
  },
  {
    name: "done",
    path: "/exam/done",
    component: Done,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    const res = axios.post(`${baseApiUrl}/auth/validate`);
    res ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
