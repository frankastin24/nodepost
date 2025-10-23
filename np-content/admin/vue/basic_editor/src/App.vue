<template>
    <div>
        <input placeholder="Post Title" type="text" class="edit-post-title" v-model="store.postTitle"/>
        <div class="flex">
            
            <div @click="selectRootContainer" class="stage">

                <DragArea index="0" container="-1" />

                <div v-for="(element, index) in store.rootElement">
                    <DragContainer :element="element">
                        <HTMLElements :element="element" />
                    </DragContainer>
                    <DragArea :index="(index + 1)" container="-1" />
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
 

const store = useAppStore();

const selectRootContainer = () => {
    store.currentContainer = store.rootElement;
}

onMounted(() => {
    store.currentContainer = store.rootElement;
    store.containers.push(store.currentContainer);
})


</script>
