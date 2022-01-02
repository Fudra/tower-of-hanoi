<template>
  <backdrop :show="props.show" />
  <transition
    name="modal-transition"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-active-class="ease-out duration-300"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="ease-in duration-300"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="props.show"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!-- Modal panel, show/hide based on modal state. -->

        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            px-4
            pt-5
            pb-4
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
          "
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
// @ts-ignore-next-line
import backdrop from "./Backdrop.vue";

const props = defineProps({ show: Boolean })

// todo add vuex
</script>