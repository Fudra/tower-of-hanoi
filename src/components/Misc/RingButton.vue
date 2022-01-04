<template>
  <!--
        Active: ""
        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
      -->
  <label
  
    class="
      border
      rounded-md
      py-3
      px-3
      flex
      items-center
      justify-center
      text-sm
      font-medium
      uppercase
      sm:flex-1
      cursor-pointer
      focus:outline-none
      transition-shadow
      duration-300

    "
    :class="{
      'bg-indigo-600 border-transparent text-white hover:bg-indigo-700':
        rings === props.label,
      'bg-white border-gray-200 text-gray-900 hover:bg-gray-50':
        rings !== props.label,
        'ring-2 ring-offset-2 ring-indigo-500' : active
    }"
  >
    <input
      ref="input"
      type="radio"
      :name="props.groupname"
      :value="props.label"
      class="sr-only"
      :aria-labelledby="props.id"
      @input="() => rings =  props.label"
      @click="clicked"
    />
    <p :id="props.id">{{ props.label }} </p>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  label: Number,
  id: String,
  groupname: String,
  modelValue: Number,
});


const active  = ref(false);
const input = ref<NodeListOf<HTMLElement>>();

const clicked = () => {
  active.value = true;

  setTimeout(() => {
    active.value = false;
  }, 500)
}

const emit = defineEmits(["update:modelValue"]);

const rings = computed({ 
  get: () => props.modelValue, 
  set: (event) => emit('update:modelValue', event)
})
</script>
