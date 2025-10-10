

<template>
    <div>
        <div class="stage">
            
            <DragArea index="0" container="-1"/>
            
            <div v-for="(element,index) in store.rootElement">
                <DragContainer :element="element">
                    <HTMLElements :element="element"/>
                </DragContainer>
                <DragArea  :index="(index + 1)" container="-1"/>
            </div>
           
        </div>

        <Elements/>
    
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

import HTMLElements from './components/HTMLElements.vue';
import Elements from './components/Elements.vue';
import DragContainer from './components/DragContainer.vue';
import DragArea from './components/DragArea.vue';
import {useAppStore} from './store/store';

const store = useAppStore();

onMounted(() => {
   store.currentContainer = store.rootElement;
})


</script>
