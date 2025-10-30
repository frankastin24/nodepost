<template>
    <div>
        <input placeholder="Post Title" type="text" class="edit-post-title" v-model="store.postTitle"/>
        
        <FeaturedImage />

        <div class="flex">
            
            <div @click="selectRootContainer" :class="['stage','root-container',(store.rootElement == store.currentContainer ? 'current-container':'')]">

                <DragArea index="0" :containerIndex="0" />

                <div v-for="(element, index) in store.rootElement">
                    <DragContainer containerIndex="0" :element="element">
                        <HTMLElements :container="store.rootElement" :element="element" />
                    </DragContainer>
                    <DragArea :index="(index + 1)" :containerIndex="0" />
                </div>

            </div>

            <EditorAside />

        </div>


        <ImageBrowser />

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import EditorAside from './components/EditorAside/EditorAside.vue';
import HTMLElements from './components/HTMLElements.vue';
import DragContainer from './components/DragContainer.vue';
import DragArea from './components/DragArea.vue';
import ImageBrowser from './components/ImageBrowser/ImageBrowser.vue';
import { useAppStore } from './store/store';
import FeaturedImage from './components/FeaturedImage.vue'
 

const store = useAppStore();

const selectRootContainer = () => {
    store.currentContainer = store.rootElement;
}

onMounted(() => {
    store.currentContainer = store.rootElement;
    store.containers.push(store.currentContainer);
})


</script>
