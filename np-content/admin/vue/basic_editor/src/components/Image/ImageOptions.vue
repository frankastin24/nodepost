<template>
<div v-if="element == store.currentElement" class="image-options all-element-options flex">
    <MoveElement :element="element"/>
    <ElementOptions :element="element"/>
</div>
</template>

<script setup>
defineProps(['element']);
import ElementOptions from '../ElementOptions.vue';
import MoveElement from '../MoveElement.vue';
import {useAppStore} from '../../store/store';
const store = useAppStore();
</script>
