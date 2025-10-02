

<template>
    <div>
        <div class="stage">

            <HTMLElements v-for="element in store.rootElement" :element="element"/>

        </div>

        <Elements/>
    
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

import HTMLElements from './components/HTMLElements.vue';
import Elements from './components/Elements.vue';

import {useAppStore} from './store/store';

const store = useAppStore();

onMounted(() => {
   store.currentContainer = store.rootElement;
})


</script>
