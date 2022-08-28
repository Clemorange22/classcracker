<template>
  <div class="lg:mt-5"></div>
  <Login />
  <ClassListGroup
    v-if="useClassData != null"
    :lists="useClassData.classList"
    :user="useClassData.userName"
    :user-class="useClassData.userClassCode"
  />
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { ClassData } from "~~/composables";

const useClassData: Ref<ClassData | null> = useState("classData", () => null);
</script>
