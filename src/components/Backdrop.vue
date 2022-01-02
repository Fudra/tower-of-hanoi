<template>
  <!--
      Background overlay, show/hide based on slide-over state.
    -->
  <transition
    name="backgrop-transition"
    enter-from-class="opacity-0"
    enter-active-class="ease-in-out duration-500"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="ease-in-out duration-500"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.show"
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({ show: Boolean });
</script>