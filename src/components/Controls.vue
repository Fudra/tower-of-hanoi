<template>
  <div
    class="
      absolute
      top-0
      bg-white
      shadow-md
      pl-4
      space-x-3
      inline-flex
      items-center
    "
  >
    <h3 class="text-sm font-medium tracking-wide text-gray-500 uppercase">
      Settings
    </h3>

    <ul role="list" class="space-x-1 flex">
      <control-button title="About" v-slot="{ styleClasses }" @click="$emit('openInfoModal')">
        <InformationCircleIcon :class="styleClasses" />
      </control-button>

      <control-button title="Controls" v-slot="{ styleClasses }" :inactive="true">
        <AdjustmentsIcon  :class="styleClasses"  />
      </control-button>

      <control-button title="Step Back"  v-slot="{ styleClasses }" :inactive="true">
        <RewindIcon  :class="styleClasses"  />
      </control-button>

      <control-button title="Play" v-slot="{ styleClasses }" :inactive="true">
        <PlayIcon  :class="styleClasses"  />
      </control-button>

      <control-button title="Pause" v-slot="{ styleClasses }" :inactive="true">
        <PauseIcon  :class="styleClasses"  />
      </control-button>

      <control-button title="Next Step"  v-slot="{ styleClasses }" :inactive="true">
        <FastForwardIcon  :class="styleClasses"  />
      </control-button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "./ControlButton.vue";
import {
  InformationCircleIcon,
  AdjustmentsIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
} from "@heroicons/vue/outline";

import {  defineEmits } from 'vue'

const emits = defineEmits(['openInfoModal'])

</script>