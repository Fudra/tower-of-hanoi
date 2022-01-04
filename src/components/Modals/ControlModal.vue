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
            v-model="rings"
          />
        </div>
      </fieldset>
    </div>
    <div class="mt-5 sm:mt-6">
      <primary-button @click="save()">okay</primary-button>
    </div>
  </modal>
</template>

<script setup lang="ts">
//@ts-ignore-next-line
import Modal from "./Modal.vue";
import PrimaryButton from "../Misc/PrimaryButton.vue";
import RingButton from "../Misc/RingButton.vue";
import { useStore } from "../../store";
import { noop } from "@vueuse/core";



import { defineEmits, ref, computed } from "vue";

const state = useStore();

const emit = defineEmits(["close", "save"]);

const save = () => {
  emit("close");
  state.dispatch("base/closeControlModal");
};

const rings = computed({ 
  get: () => state.getters['game/getRings'],
  set: (rings) => state.dispatch('game/setRings', rings)
})

const ringCount = computed({
  get: () => state.getters['game/getRingCount'],
  set: () => noop()
})

const close = () => {

};


</script>