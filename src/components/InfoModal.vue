<template>
  <modal>
    <div
      class="mx-auto flex items-center justify-center h-20 w-20 rounded-full"
    >
      <span class="text-6xl inline">🗼</span>
    </div>

    <div class="mt-3 text-center sm:mt-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
        Tower of Hanoi
      </h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          amet labore.
        </p>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <button
        type="button"
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
       Let's Go!
      </button>
    </div>
  </modal>
</template>

<script setup lang="ts">
//@ts-ignore-next-line
import Modal from "./Modal.vue";
</script>