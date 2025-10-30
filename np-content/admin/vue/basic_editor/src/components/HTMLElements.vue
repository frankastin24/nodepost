<template>
    
    <Container :element="element" @click="selectElement(element,container)"  v-if="element.type == 'container'" />
    
    <div @click.stop="selectElement(element,container)" v-if="element.type == 'columns'" :style="elementStyles(element)" :class="[element.classes,(store.currentElement == element ? 'current-element':'')]">
        <Column :column="column" v-for="(column, index) in element.columns"/>
    </div>
    
    <Heading @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'heading'"/>
    
    <Paragraph @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'paragraph'"/>
    
    <Image :class="element == store.currentElement ? 'current-element' : ''" @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'image'"/>
    
    <Spacer  :class="element == store.currentElement ? 'current-element' : ''" @click.stop="selectElement(element,container)" :element="element" v-if="element.type == 'spacer'"/>

    <video @click.stop="selectElement(element,container)" v-if="element.type == 'video'">
        <src v-if="element.media"></src>
    </video>

    <div @click.stop="selectElement(element,container)" v-if="element.type == 'shortcode'">
        <p>Shortcode:</p>
        <input v-model="element.codename" type="text"/>
    </div>

    <div @click.stop="selectElement(element,container)" v-if="element.type == gallery">
        <div :style="galleryElementStyle(img)" v-for="img in element.mediaElements" class="gallery-element">

        </div>
    </div>

</template>

<script setup>

defineProps(['element','container']);

import {useAppStore} from '../store/store';
const store = useAppStore();
import Column from './Column.vue';
import Heading from './Heading/Heading.vue';
import Paragraph from './Paragraph/Paragraph.vue';
import Image from './Image/Image.vue';
import Container from './Container.vue';
import Spacer from './Spacer.vue';


const selectElement = (currentElement,container) => {
    store.currentElement = currentElement;
    store.currentContainer = container;

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