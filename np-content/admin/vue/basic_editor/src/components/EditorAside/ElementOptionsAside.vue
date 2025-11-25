<template>

    <aside class="basic-editor-aside">
        
        <div class="element-options">
            <h3>Element Options</h3>
            <ImageOptionsAside v-if="store.currentElement?.type == 'image'" />
            <HeadingOptionsAside v-if="store.currentElement?.type == 'heading'" />
            
            <AllElementsAside  />
        </div>
        
        <div class="element-selector">
           <h3>Select Elements</h3>
           <ElementSelector />
        </div>

    </aside>

</template>

<script setup>
import ImageOptionsAside from './ImageOptionsAside.vue';
import AllElementsAside from './AllElementsAside.vue';
import HeadingOptionsAside from './HeadingOptionsAside.vue';
import ElementSelector from './SelectElement/ElementSelector.vue';
import {useAppStore} from '../store/store';
const store = useAppStore();

</script>