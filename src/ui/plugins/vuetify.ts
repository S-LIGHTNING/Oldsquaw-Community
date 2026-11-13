import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"

export const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    "background": "#FAFAFA",
                    "surface-light": "#FFFFFF",
                    "primary": "#6E4FF4"
                },
                variables: {
                    "shadow-key-opacity": 0.14,
                    "shadow-ambient-opacity": 0.07
                }
            }
        }
    },
    defaults: {
        VImg: {
            cover: true
        },
        VSheet: {
            elevation: 1
        },
        VToolbar: {
            color: "transparent"
        },
        VMenu: {
            VBtn: {
                variant: "text",
                rounded: "0",
                block: true,
                active: false,
                size: "large"
            }
        },
        VTextField: {
            variant: "outlined",
            density: "comfortable"
        },
        VSelect: {
            variant: "outlined",
            density: "comfortable"
        },
        VTextarea: {
            variant: "outlined"
        },
        VFileInput: {
            variant: "outlined",
            density: "comfortable"
        },
        VForm: {
            VBtn: {
                block: true,
                variant: "outlined"
            }
        },
        VSkeletonLoader: {
            elevation: 1
        },
        VBtnToggle: {
            mandatory: true,
            divided: true,
            border: true
        }
    }
})
