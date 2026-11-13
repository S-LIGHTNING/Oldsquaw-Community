import { createApp } from "vue"

import { vuetify } from "./ui/plugins/vuetify"
import { router } from "./ui/app/router"

import "./ui/app/style.css"
import App from "./ui/app/App.vue"

createApp(App)
    .use(vuetify)
    .use(router)
    .mount("#root")
