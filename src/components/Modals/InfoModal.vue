<template>
  <modal
    :show="state.getters['base/isModalAboutOpen']"
    @clickedOutside="close()"
  >
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
          [todo] Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequatur amet labore.
        </p>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <primary-button @click.prevent="close()"> Let's Go! </primary-button>
    </div>
  </modal>
</template>

<script setup lang="ts">
//@ts-ignore-next-line
import Modal from "./Modal.vue";
import PrimaryButton from "../Misc/PrimaryButton.vue";

import { useStore } from "../../store";

import { defineEmits } from "vue";

const state = useStore();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
  state.dispatch("base/closeAboutModal");
};
</script>