<template>
    
    <div @click="selectElement(element)"  v-if="element.type == 'container'" :style="elementStyles(element)" :class="element.classes"></div>
    
    <div @click="selectElement(element)" v-if="element.type == 'columns'" :style="elementStyles(element)" :class="element.classes">
        <Column :column="column" v-for="(column, index) in element.columns"/>
    </div>
    
    <Heading @click="selectElement(element)" :element="element" v-if="element.type == 'heading'"/>
    
    <Paragraph @click="selectElement(element)" :element="element" v-if="element.type == 'paragraph'"/>
    
    <Image :class="element == store.currentElement ? 'current-element' : ''" @click="selectElement(element)" :element="element" v-if="element.type == 'image'"/>
    
    <video @click="selectElement(element)" v-if="element.type == 'video'">
        <src v-if="element.media"></src>
    </video>

    <div @click="selectElement(element)" v-if="element.type == 'shortcode'">
        <p>Shortcode:</p>
        <input v-model="element.codename" type="text"/>
    </div>

    <div @click="selectElement(element)" v-if="element.type == gallery">
        <div :style="galleryElementStyle(img)" v-for="img in element.mediaElements" class="gallery-element">

        </div>
    </div>

</template>

<script setup>

defineProps(['element']);

import {useAppStore} from '../store/store';
import Column from './Column.vue';
import Heading from './Heading/Heading.vue';
import Paragraph from './Paragraph/Paragraph.vue';
import Image from './Image/Image.vue';
const store = useAppStore();

const selectElement = (currentElement) => {
    store.currentElement = currentElement;

    if(currentElement.type == 'container' || currentElement.type == 'column') {
        store.currentContainer = currentElement.elements;
    }
}

const elementStyles = (element) => {

    if(element.type == 'container') {
        return {
            width: element.width,
            minHeight: '100px',
        }
    }
    if(element.type == 'heading') {
        let fontStyle = '';
        if(element.bold) {
            fontStyle = 'bold';
        }

        return {
           fontStyle,
           textAlign: element.align,
           color: element.color
        }
    }
}

</script>