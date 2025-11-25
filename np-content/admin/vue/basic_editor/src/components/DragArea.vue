<template>

    <div ref="dragElement" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop="drop($event,index,containerIndex)"  :class="classes()">
        <div class="drop-bar"><img width="20" src="/np-content/admin/img/drop.svg"/></div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import {useAppStore} from '../store/store';
let store = useAppStore();
const dragElement = ref();
defineProps(['element','index','containerIndex']);

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

const drop = (e,index,containerIndex) => {
  
    dragElement.value.classList.remove('drag-over')

    const draggedFromContainerIndex = e.dataTransfer.getData('containerIndex');
    const dropAreaContainerIndex = containerIndex;
    
    const currentElement = store.currentElement;

    const elementIndex = store.containers[draggedFromContainerIndex].indexOf(currentElement);

    const element = store.containers[draggedFromContainerIndex].splice(elementIndex,1);

    store.containers[dropAreaContainerIndex].splice(index,0,element[0]); 
    store.currentContainer = store.containers[dropAreaContainerIndex];
}

</script>