<template>
<div @click="showElementOptionsDropdown(element)" class="element-options">
    
    <h4>...</h4>

    <ul v-if="element.displayElementOptions">
        <li @click="duplicate(element)">Duplicate</li>
        <li @click="remove(element)">Delete</li>
    </ul>

</div>
    
</template>
<script setup>
defineProps(['element']);

import {useAppStore} from '../store/store';

const store = useAppStore();

const showElementOptionsDropdown = (element) => {
    element.displayElementOptions = !element.displayElementOptions;
    element.showLevels = false;
    element.showAligns = false;
    
}

const remove = (element) => {
    const index = store.currentContainer.indexOf(element);
    store.currentContainer.splice(index,1);
}

const duplicate = (element) => {
     const newElement = Object.assign({},element);

     const index = store.currentContainer.indexOf(element);

     store.currentContainer.splice(index+1,0,newElement);
}
</script>