<template>
    <div class="move-element">
        <div @click="moveUp(element)">up</div>
        <div @click="moveDown(element)">down</div>
        <div @click="drag">drag</div>
    </div>
</template>
<script setup>

import {useAppStore} from '../store/store';
const store = useAppStore();
defineProps(['element']);
const moveUp = (element) => {

    const index = store.currentContainer.indexOf(element);

    if(index > 0) {
    store.currentContainer.splice(index,1);
    store.currentContainer.splice(index -1 ,0, element);
    }

   

}
const moveDown = (element) => {

     const index = store.currentContainer.indexOf(element);
     const length = store.currentContainer.length - 1;
    if(index < length) {
    store.currentContainer.splice(index,1);
    store.currentContainer.splice(index +1 ,0, element);
    }

}

</script>