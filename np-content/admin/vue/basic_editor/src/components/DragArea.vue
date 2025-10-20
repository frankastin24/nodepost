<template>
<div ref="dragElement" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop="drop(index)"  :class="classes()">
    <div class="drop-bar"></div>
</div>
</template>
<script setup>
import { ref, computed } from 'vue'
import {useAppStore} from '../store/store';
let store = useAppStore();
const dragElement = ref();
defineProps(['index','container']);

let isDragOver = false;

const onDragOver = () => {
    dragElement.value.classList.add('drag-over')
    isDragOver = true;
}

const onDragLeave = () => {
    dragElement.value.classList.remove('drag-over')
    setTimeout(() => {
       isDragOver = false;
    },1000)
    
}

const classes = () => {

    const dragOver = (isDragOver ? 'drag-over' : '');

    return 'drag-element '+ dragOver;
}

const drop = (index) => {
  
    dragElement.value.classList.remove('drag-over')
    
    const currentElement = store.currentElement;
    const elementIndex = store.currentContainer.indexOf(currentElement);

    const element = store.currentContainer.splice(elementIndex,1);

    store.currentContainer.splice(index,0,element[0]);
    
}

</script>