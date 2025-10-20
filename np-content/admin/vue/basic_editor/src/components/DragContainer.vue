<template>
<div draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" class="drag-container">
    <div v-if="store.currentElement == element" @mousedown="enableDrag" @mouseup="disableDrag"
      @mouseleave="disableDrag" class="drag-handle">+</div>
    <slot></slot>
</div>
</template>

<script setup>

import { ref, computed } from 'vue'

import {useAppStore} from '../store/store';

const store = useAppStore();

defineProps(['element']);

const dragging = ref(false)
const dragEnabled = ref(false)
const dropped = ref(false)

function enableDrag() {
  dragEnabled.value = true
}

function disableDrag() {
  dragEnabled.value = false
}

function onDragStart(event) {
  if (!dragEnabled.value) {
    event.preventDefault()
    return
  }
  dragging.value = true
  event.dataTransfer.setData('text/plain', 'dragged-element')
}

function onDragEnd() {
  dragging.value = false
}

</script>