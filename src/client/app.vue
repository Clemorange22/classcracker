<template>
  <Html data-theme="night" class="bg-base-100">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </Html>
</template>

<script setup lang="ts">
import { themeChange } from "theme-change";
onMounted(() => {
  themeChange(false);
});
useHead({
  title: "ClassCracker",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "description",
      content:
        "ClassCracker permet d'obtenir la liste des classes avant la rentrée",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>
