<template>
    <div class="editor-aside">
        <div class="tabs">
            <header class="flex">
                <button @click="changeActiveTab(0)" :class="store.activeTab === 0 ? 'active' : ''">Element Options</button>
                <button @click="changeActiveTab(1)" :class="store.activeTab ===  1 ? 'active' : ''">Post Options</button>
            </header>
           
            <div v-if="store.activeTab === 0"  class="tab element-options-aside">
                
                <ColumnOptionsAside v-if="store.currentElement?.type == 'columns'" />
                <ImageOptionsAside v-if="store.currentElement?.type == 'image'" />
                <HeadingOptionsAside v-if="store.currentElement?.type == 'heading'" />
                
                <AllElementsAside v-if="store.currentElement" />
            </div>
            <div v-if="store.activeTab === 1" class="tab post-options-aside">
                <button class="btn btn-blue btn-medium">Publish</button>
                <button class="btn btn-blue btn-medium">Save Draft</button>
                <p>Post Status: {{store.postStatus}}</p>
                <p >Post Slug:</p>
                <div class="flex">
                <p>http://localhost/portfolio/</p>
                <input v-model="store.postSlug" type="text"/>
                </div>
                <p>Featured Image:</p>

                <img width="60%" v-if="store.featuredImage" src="store.featuredImage.src"/>
                
                <button @click="selectFeaturedImage">
                    <img width="50" src="/np-content/admin/img/image-upload.svg"/>
                    <p class="small">Select Featured Image</p>
                </button>

                <p >Revisions:</p>
                <p v-if="store.revisions.length === 0" class="small">No revisions saved</p>
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
console.log(store.activeTab)
const changeActiveTab = (tab) => {
    store.activeTab = tab;
}

</script>