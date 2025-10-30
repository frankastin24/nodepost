<template>
  <div
    @dragstart.stop="onDragStart($event, containerIndex,dragEnabled)"
    @dragend.stop="onDragEnd"
    draggable="true"
    class="drag-container"
  >
  <div @click="duplicateElement(element)" class="duplicate-element"><img width="20" src="/np-content/admin/img/bin.svg"/></div>
    <div @click="deleteElement(element)" class="delete-element"><img width="20" src="/np-content/admin/img/bin.svg"/></div>
    <MoveElement v-if="store.currentElement == element" :element="element" />

    <div
      v-if="store.currentElement == element"
      class="drag-handle"
      @mousedown="enableDrag(dragEnabled)"
      @mouseup="disableDrag(dragEnabled)"
      @mouseleave="disableDrag(dragEnabled)"
    >
      
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../store/store'
const store = useAppStore()

defineProps(['element', 'containerIndex'])
import MoveElement from './MoveElement.vue'

const deleteElement = (element) => {
    const index = store.currentContainer.indexOf(element);
    store.currentContainer.splice(index,1);
}

// Use a plain variable for dragEnabled!
let dragEnabled = false

function enableDrag() {
  dragEnabled = true
}

function disableDrag() {
  dragEnabled = false
}

function onDragStart(event, containerIndex) {
  if (!dragEnabled) {
    event.preventDefault()
    return
  }
  event.dataTransfer.setData('containerIndex', containerIndex)
}

function onDragEnd() {
  dragEnabled = false
}
</script>