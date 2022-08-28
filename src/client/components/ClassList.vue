<template>
  <div class="overflow-x-auto w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
    <div class="flex flex-row flex-wrap w-full justify-center">
      <div
        :class="
          'card w-40 m-2 text-secondary-content' +
          (!(user == '') && user == student ? ' bg-primary' : ' bg-secondary')
        "
        v-for="(student, index) in list"
        :key="index"
      >
        <div class="card-body p-4">
          <div
            class="card-title justify-center text-base text-center font-mono"
          >
            {{ student }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  className: {
    type: String,
    default: "",
  },
  user: {
    type: String,
    default: "",
  },
});
</script>
