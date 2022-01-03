<template>
    <button
        type="button"
        @click.prevent="() => $emit('click')"
        class="
          inline-flex
          justify-center
          w-full
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-indigo-600
          text-base
          font-medium
          text-white
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          sm:text-sm
        "
      >
      <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
</script>