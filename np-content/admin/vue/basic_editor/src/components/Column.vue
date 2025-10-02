<template>
    
    <div @click="selectElement(column)"  :style="columnStyles(column)" :class="column.classes">
         <HTMLElements :element="element" v-for="element in column.elements" /> 
    </div>

</template>

<script setup>
defineProps(['column']);

import {useAppStore} from '../store/store';
import HTMLElements from './HTMLElements.vue';

const store = useAppStore();

const columnStyles = (column) => {
    return {
        width : column.width,
        minWidth : `calc(${column.width} - 7px)`,
        minHeight: '100px'
    }
}

const selectElement = (column) => {
    
    store.currentElement = column;
    store.currentContainer = column.elements;
    
}

</script>