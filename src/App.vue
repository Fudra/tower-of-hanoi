<template>
  <game />
  <controls />
  <info-modal />
  <control-modal />
</template>

<script setup lang="ts">

// @ts-ignore-next-line
import InfoModal from "./components/Modals/InfoModal.vue";
// @ts-ignore-next-line
import ControlModal from "./components/Modals/ControlModal.vue";
// @ts-ignore-next-line
import Controls from "./components/Controls/Controls.vue";
// @ts-ignore-next-line
import Game from "./components/Game.vue";

</script>
