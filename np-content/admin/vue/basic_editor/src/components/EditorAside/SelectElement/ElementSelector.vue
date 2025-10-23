<template>
    <div class="elements-panel">
        <div class="flex elements">
             <button @click="addHeading">
                <h4 class="heading-icon">H1</h4>
                <p>Heading</p>
            </button>
            <button @click="addParagraph">
                <h4 class="paragraph-icon">¶</h4>
                <p>Paragraph</p>
            </button>
            <button @click="addImage">
                <img width="20" src="/np-content/admin/img/image-upload.svg"/>
                <p>Image</p>
            </button>
            <button @click="addContainer">
                <div class="container-icon"></div>
                <p>Container</p>
             </button>
            <button @click="addColumns">
                <div class="column-icon flex">
                    <div></div>
                    <div></div>
                </div>
                <p>Columns</p>
            </button>
           
            <button @click="addVideo">
                <img width="20" src="/np-content/admin/img/image-upload.svg"/>
                <p>Video</p>
            </button>
            <button @click="addShortcode">
                <h4>[  ]</h4>
                <p>Shortcode</p>
            </button>
            <button @click="addGallery">
                <img width="20" src="/np-content/admin/img/image-upload.svg"/>
                <p>Gallery</p>
            </button>  
        </div>

    </div>
</template>

<script setup>

import {useAppStore} from '../../../store/store';

const store = useAppStore();

const addContainer = () => {
    const container = {
        type:'container',
        width:'100%',
        backgroundColor: 'transparent',
        center: true,
        classes: 'np-container np-element',
        elements: [],
        extraClasses : '',
        id: '',
    }

    store.currentContainer.push(container);
}

const addColumns = () => {
    const columns = {
        type:'columns',
        numberOfColums:2,
        gap:'0px',
        classes: 'np-element np-columns flex',
        extraClasses : '',
        id: '',
        columns : [
            { 
                type: 'column',
                width:'50%',
                classes:'np-element',
        extraClasses : '',
        id: '',
                elements: [],
            },
            {
                type: 'column',
                width:'50%',
                classes: 'np-element',
                extraClasses : '',
                id: '',
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
        id: '',
        align : 'left',
        color: '#000',
        bold:true,
        showLevels:false,
        showAligns:false,
        showElementOptions:false,
        content:'',
        extraClasses : '',
    }
    store.currentContainer.push(heading);
    store.currentElement = heading;
}

const addParagraph = () => {
    const paragraph = {
        type:'paragraph',
        classes : 'np-element np-paragraph',
        align : 'left',
        color: '#000',
        showAligns:false,
        showElementOptions:false,
        content:'',
        extraClasses : '',
        id: '',
    }
    store.currentContainer.push(paragraph);
    store.currentElement = paragraph;
}

const addImage = () => {
   store.showImageBrowser = true;
}

const addVideo = () => {

    const video = {
    type:'video',
    media: null, 
    width: 'auto',
    height: 'auto',
    center:false,
    classes:'np-element np-video',
    extraClasses : '',
    id: '',
   }
   store.currentContainer.push(video);

}

const addShortcode = () => {

    const shortcode = {
        type:'shortcode',
        codename: '',
        classes: 'np-element np-shortcode',
        extraClasses : '',
        id: '',
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
        classes:'np-element np-gallery',
        extraClasses : '',
        id: '',
    }

    store.currentContainer.push(gallery);
}

</script>