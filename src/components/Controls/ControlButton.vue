<template>
     <li class="flow-root">
        <button
          @click.prevent="$emit('click')"
          type="button"
          class="
            p-3
            flex
            items-center
            rounded-md
            text-base
            font-medium
            transition
            ease-in-out
            duration-150
          "

          :class="{ 'text-gray-900 hover:bg-gray-100' : !props.inactive , ' text-gray-400 pointer-events-none cursor-not-allowed': props.inactive }"
        >

            <slot :styleClasses="styleClasses">
                <CubeIcon class="h-5 w-5 text-blue-500"/>
            </slot>
          <span class="ml-4 select-none">{{ props.title }}</span>
        </button>
      </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch} from 'vue'
import { CubeIcon } from '@heroicons/vue/solid'

const props = defineProps({ title: String, inactive: Boolean })

const emits = defineEmits(['click'])

const styleClasses = ref('text-gray-800 h-5 w-5');

watch(() => props.inactive, 
(value) => styleClasses.value  = `h-5 w-5 ${value ? 'text-gray-400' : 'text-gray-800'}` , {immediate: true})

</script>