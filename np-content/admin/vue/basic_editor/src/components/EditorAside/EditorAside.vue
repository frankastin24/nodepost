<template>
    <div class="editor-aside">
        <div class="tabs">
            <header class="flex">
                <button @click="changeActiveTab(0)" :class="store.activeTab === 0 ? 'active' : ''">Element</button>
                <button @click="changeActiveTab(1)" :class="store.activeTab ===  1 ? 'active' : ''">Post</button>
            </header>
           
            <div v-if="store.activeTab === 0"  class="tab element-options-aside">
                
                <ColumnOptionsAside v-if="store.currentElement?.type == 'columns'" />
                <ImageOptionsAside v-if="store.currentElement?.type == 'image'" />
                <HeadingOptionsAside v-if="store.currentElement?.type == 'heading'" />
                
                <AllElementsAside v-if="store.currentElement" />
            </div>
            <div v-if="store.activeTab === 1" class="tab post-options-aside">
                
                <div class="">
                    <button class="btn btn-primary">Publish</button>
                    <button class="btn btn-primary">Preview</button>
                    <button class="btn btn-primary">Save Draft</button>
                </div>
                
                <h4>POST STATUS: {{store.postStatus.toUpperCase()}}</h4>
                

                <h4>REVISIONS</h4>
                <p v-if="store.revisions.length === 0" class="small">No revisions saved</p>
                <ul>
                    <li v-for="revision in store.revisions">{{ revision.time }} <button class="btn btn-small" @click="loadRevision(revison)">Restore</button></li>
                </ul>
                
            </div>
        
        </div>

       

    </div>
</template>
<script setup>
import AllElementsAside from './ElementOptions/AllElementsAside.vue';
import ImageOptionsAside from './ElementOptions/ImageOptionsAside.vue';
import HeadingOptionsAside from './ElementOptions/HeadingOptionsAside.vue';
import ColumnOptionsAside from './ElementOptions/ColumnsOptions.vue';

import {useAppStore} from '../../store/store';
const store = useAppStore();
const changeActiveTab = (tab) => {
    store.activeTab = tab;
}

</script>