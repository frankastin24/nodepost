<template>

<div @click="selectElement(element)">
        
    <ParagraphOptions :element="element"/>

    <ParagraphElement v-model="element.content" :class="classes(element)" :style="elementStyles(element)"/>
</div>

</template>
<script setup>
import ParagraphOptions from './ParagraphOptions.vue';
import ParagraphElement from './ParagraphElement.vue';
import {useAppStore} from '../../store/store';

const store = useAppStore();

defineProps(['element']);

const selectElement = (element) => {
    store.currentElement = element;
}

const classes = (element) => {
    const isSelected = store.currentElement === element;
    
    const selectedClass = isSelected ? 'current-element' : '';

    return selectedClass + ' ' + element.classes;
}

const elementStyles = (element) => {
    return {
        textAlign:element.align,
    }
}
</script>