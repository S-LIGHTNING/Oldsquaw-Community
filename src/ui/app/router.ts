import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router"

export type NavigationRoute = RouteRecordRaw & {
    meta: {
        title: string
        icon: string
    }
}

export const navigationRoutes: NavigationRoute[] = [
    {
        path: "/",
        name: "home",
        component: () => import("../pages/Home/index.vue"),
        meta: { title: "主页", icon: "mdi-home-outline" }
    }, {
        path: "/work",
        name: "work",
        component: () => import("../pages/Work/index.vue"),
        meta: { title: "作品", icon: "mdi-view-grid-outline" }
    }, {
        path: "/forum",
        name: "forum",
        component: () => import("../pages/Forum/index.vue"),
        meta: { title: "论坛", icon: "mdi-forum-outline" }
    }, {
        path: "/studio",
        name: "studio",
        component: () => import("../pages/Studio.vue"),
        meta: { title: "工作室", icon: "mdi-account-multiple-outline" }
    }, {
        path: "/plugin",
        name: "plugin",
        component: () => import("../pages/AllPlugins.vue"),
        meta: { title: "插件", icon: "mdi-puzzle-outline" }
    }
]

export const routes: RouteRecordRaw[] = [
    ...navigationRoutes,
    { path: "/me", component: () => import("../pages/Me.vue") },
    { path: "/user/:id", component: () => import("../pages/User.vue") },
    { path: "/work/:id", component: () => import("../pages/Work/Work.vue") },
    { path: "/work/run", component: () => import("../pages/Work/Run.vue") },
    { path: "/forum/post/:id", component: () => import("../pages/Forum/Post.vue") },
    { path: "/forum/board/:id", component: () => import("../pages/Forum/Board.vue") },
    { path: "/plugin/:id", component: () => import("../pages/Home/index.vue") },
    { path: "/publish/work", component: () => import("../pages/PublishWork.vue") },
    { path: "/publish/plugin", component: () => import("../pages/PublishPlugin/index.vue") }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

const originalTitle = document.title

router.beforeEach((to, __from, next) => {
    const title = to.meta.title
    if (title === undefined || title === "主页") {
        document.title = originalTitle
    } else {
        document.title = title + " - " + originalTitle
    }
    next()
})
