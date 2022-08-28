<template>
  <div class="container mx-auto mt-4">
    <div class="flex flex-col items-center mx-auto">
      <div
        class="tabs tabs-boxed font-mono w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 flex flex-row overflow-x-auto flex-wrap items-center"
      >
        <a
          :class="
            'tab tab-lg flex-1' +
            (selectedClass == className ? ' tab-active' : '')
          "
          v-for="className in classList"
          @click="selectedClass = className"
        >
          {{ className }}
        </a>
      </div>
      <div class="w-full" v-for="[className, list] in Object.entries(lists)">
        <ClassList
          v-if="selectedClass == className"
          :list="list"
          :class-name="className"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import ClassList from "./ClassList.vue";
import { keys } from "lodash";

const props = defineProps({
  lists: {
    type: Object as PropType<{ [key: string]: Array<String> }>,
    required: true,
  },
  user: {
    type: String,
    default: "",
  },
  userClass: {
    type: String,
    default: "",
  },
});
let classList = ref(keys(props.lists));
let selectedClass = ref(
  props.userClass != "" ? props.userClass : classList.value[0]
);
</script>
