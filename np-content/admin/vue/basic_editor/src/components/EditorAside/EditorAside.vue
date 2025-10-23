<template>
    <div class="editor-aside">
        <div class="tabs">
            <header class="flex">
                <button @click="changeActiveTab(0)" :class="store.activeTab = 0? 'active' : ''">Element Options</button>
                <button @click="changeActiveTab(1)" :class="store.activeTab = 0? 'active' : ''">Post Options</button>
            </header>
            <div v-if="store.activeTab == 0" class="tab">
                <ColumnOptionsAside v-if="store.currentElement.type == 'columns'" />
                <ImageOptionsAside v-if="store.currentElement.type == 'image'" />
                <HeadingOptionsAside v-if="store.currentElement.type == 'heading'" />
                
                <AllElementsAside />
            </div>
            <div v-if="store.activeTab == 1" class="tab">
                
                <p class="small">Post Slug:</p>
                <input v-model="store.postSlug" type="text"/>

                <button class="btn btn-medium">Publish</button>
                <p class="small">Revisions</p>
                <ul>
                    <li v-for="revision in store.revisions">{{ revision.time }} <button class="btn btn-small" @click="loadRevision(revison)">Restore</button></li>
                </ul>
                
            </div>
        
        </div>

        <ElementSelector />

    </div>
</template>
<script setup>
import ElementSelector from './SelectElement/ElementSelector.vue';
import AllElementsAside from './AllElementsAside.vue';
import ImageOptionsAside from './ImageOptionsAside.vue';
import HeadingOptionsAside from './HeadingOptionsAside.vue';
import ColumnOptionsAside from './ColumnsOptions.vue';

import {useAppStore} from '../../store/store';
const store = useAppStore();
const changeActiveTab = (tab) => {
    store.activeTab = parseInt(tab);
}
</script>