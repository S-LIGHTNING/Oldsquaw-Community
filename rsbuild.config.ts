import { defineConfig } from "@rsbuild/core"
import { pluginVue } from "@rsbuild/plugin-vue"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import { VuetifyPlugin } from "webpack-plugin-vuetify"

// Docs: https://rsbuild.rs/config/
export default defineConfig({
    server: {
        open: "http://oldsquaw-community.localhost:3000/",
        proxy: {
            // "/api": "https://ccn.hopex.top"
        },
        publicDir: [
            { name: "public" },
            { name: "public.dev", copyOnBuild: false }
        ]
    },
    plugins: [
        pluginVue(),
        pluginNodePolyfill()
    ],
    html: {
        title: "Oldsquaw 社区"
    },
    tools: {
        rspack: {
            plugins: [
                new VuetifyPlugin({})
            ]
        }
    }
})
