import { defineNuxtConfig } from "nuxt";
import process from "process";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@vueuse/nuxt", "nuxt-typed-router"],
  typescript: {
    shim: false,
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["~/assets/styles/css/tailwind.css", "~/assets/styles/scss/main.scss"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
});
