<template>
    <div v-if="store.displayElements" class="elements-panel">
        
        <div class="close">X</div>

        <div class="flex elements">
            <button @click="addContainer">Container</button>
            <button @click="addColumns">Columns</button>
            <button @click="addHeading">Heading</button>
            <button @click="addParagraph">Paragraph</button>
            <button @click="addImage">Image</button>
            <button @click="addVideo">Video</button>
            <button @click="addShortcode">Shortcode</button>
            <button @click="addGallery">Gallery</button>  
        </div>

    </div>
</template>

<script setup>

import {useAppStore} from '../store/store';

const store = useAppStore();

const addContainer = () => {
    const container = {
        type:'container',
        width:'100%',
        backgroundColor: 'transparent',
        center: true,
        classes: 'np-container np-element',
        elements: []
    }

    store.currentContainer.push(container);
}

const addColumns = () => {
    const columns = {
        type:'columns',
        numberOfColums:2,
        gap:'0px',
        classes: 'np-element np-columns flex',
        columns : [
            { 
                type: 'column',
                width:'50%',
                classes:'np-element',
                elements: [],
            },
            {
                type: 'column',
                width:'50%',
                classes: 'np-element',
                elements : []
            }
        ]
    }

    store.currentContainer.push(columns);
}

const addHeading = () => {
    const heading = {
        type:'heading',
        text : 'Heading',
        level : 'h1',
        classes : 'np-element np-heading',
        align : 'left',
        color: '#000',
        bold:true
    }
    store.currentContainer.push(heading);
    store.currentElement = heading;
}

const addImage = () => {
   const image = {
    type:'image',
    media: null, 
    width: '',
    height: '',
    size: 'fit',
    position: '',
    center:false,
    classes: 'np-element np-image'
   }
   store.currentContainer.push(image);
}

const addVideo = () => {

    const video = {
    type:'video',
    media: null, 
    width: 'auto',
    height: 'auto',
    center:false,
    classes:'np-element np-video'
   }
   store.currentContainer.push(video);

}

const addShortcode = () => {

    const shortcode = {
        type:'shortcode',
        codename: '',
        classes: 'np-element np-shortcode'
    
    }
   store.currentContainer.push(shortcode);

}

const addGallery = () => {
    const gallery = {
        type: 'gallery',
        mediaElements : [],
        elementsPerRow : 3,
        gap: 10,
        popup:true,
        classes:'np-element np-gallery'
    }

    store.currentContainer.push(gallery);
}

</script>