<template>
  <modal
    :show="state.getters['base/isModalControlOpen']"
    @clickedOutside="close()"
  >
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-900">Rings</h2>
      </div>
      <fieldset class="mt-2">
        <legend class="sr-only">Choose how many rings</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          <ring-button
            v-for="(ring, index) in ringCount"
            :label="ring"
            :id="`ring-count-${index}-label`"
            groupname="ring-count"
            :key="index"
            v-model="selectedRings"
          />
        </div>
      </fieldset>
    </div>
    <div class="mt-5 sm:mt-6 space-x-2 flex">
      <primary-button @click="save()">Save</primary-button>
      <primary-button @click="close()">close</primary-button>
    </div>
  </modal>
</template>

<script setup lang="ts">
//@ts-ignore-next-line
import Modal from "./Modal.vue";
import PrimaryButton from "../PrimaryButton.vue";
import RingButton from "../RingButton.vue";
import { useStore } from "../../store";

import { defineEmits, ref } from "vue";

const state = useStore();

const emit = defineEmits(["close", "save"]);

const save = () => {
  console.log("saved!");
  emit("save");
  close();
};

const selectedRings = ref(3);

const close = () => {
  emit("close");
  state.dispatch("base/closeControlModal");
};

const ringCount = [3, 4, 5, 6, 7, 8];
</script>