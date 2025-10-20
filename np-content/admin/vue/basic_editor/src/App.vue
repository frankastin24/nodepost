

<template>
    <div>
        <div @click="selectRootContainer" class="stage">
            
            <DragArea index="0" container="-1"/>
            
            <div v-for="(element,index) in store.rootElement">
                <DragContainer :element="element">
                    <HTMLElements :element="element"/>
                </DragContainer>
                <DragArea  :index="(index + 1)" container="-1"/>
            </div>
           
        </div>

        <Elements/>
        <ImageBrowser/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

import HTMLElements from './components/HTMLElements.vue';
import Elements from './components/Elements.vue';
import DragContainer from './components/DragContainer.vue';
import DragArea from './components/DragArea.vue';
import ImageBrowser from './components/ImageBrowser/ImageBrowser.vue';
import {useAppStore} from './store/store';

const store = useAppStore();

const selectRootContainer = () => {
    store.currentContainer = store.rootElement;
}

onMounted(() => {
   store.currentContainer = store.rootElement;
   store.containers.push(store.currentContainer);
})


</script>
