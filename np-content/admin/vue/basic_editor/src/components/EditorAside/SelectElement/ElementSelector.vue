<template>
    <div class="elements-panel">
        <div class=" elements">
            <h4>PAGE ELEMENTS</h4>
            <div class="flex">
                <button @click="addHeading">
                    <h4 class="heading-icon">H1</h4>
                    <p>HEADING</p>
                </button>
                <button @click="addParagraph">
                    <h4 class="paragraph-icon">¶</h4>
                    <p>PARAGRAPH</p>
                </button>
                <button @click="addButton">
                    <div class="button-icon">CTA</div>
                    <p>BUTTON</p>
                </button>
            </div>
            <h4>MEDIA</h4>
            <div class="flex">
                <button @click="addImage">
                    <img width="20" src="/np-content/admin/img/image-upload.svg" />
                    <p>IMAGE</p>
                </button>
                <button @click="addVideo">
                    <img width="20" src="/np-content/admin/img/image-upload.svg" />
                    <p>VIDEO</p>
                </button>
                <button @click="addGallery">
                    <img width="20" src="/np-content/admin/img/image-upload.svg" />
                    <p>GALLEY</p>
                </button>
            </div>

            <h4>LAYOUT</h4>

            <div class="flex">

                <button @click="addContainer">
                    <div class="container-icon"></div>
                    <p>CONTAINER</p>
                </button>

                <button @click="addColumns">
                    <div class="column-icon flex">
                        <div></div>
                        <div></div>
                    </div>
                    <p>COLUMNS</p>
                </button>

                <button @click="addSpacer">
                    <h4><img width="20" src="/np-content/admin/img/spacer.svg" /></h4>
                    <p>SPACER</p>
                </button>
            </div>


        </div>

    </div>
</template>

<script setup>

import { useAppStore } from '../../../store/store';

const store = useAppStore();

const addSpacer = () => {
    const spacer = {
        type: 'spacer',
        height: 10
    }
    store.currentContainer.push(spacer);
    store.currentElement = spacer;
}

const addContainer = () => {
    const container = {
        type: 'container',
        width: '100%',
        height: '120px',
        background: 'transparent',
        backgroundSize: 'cover',
        center: true,
        classes: 'np-container ',
        elements: [],
        extraClasses: '',
        id: '',
        index: false,
    }

    store.currentContainer.push(container);
    store.currentContainer = container.elements;
    store.currentElement = container;
    const index = store.containers.length;
    container.index = index;
    store.containers.push(container.elements)

}

const addColumns = () => {
    const columns = {
        type: 'columns',
        numberOfColums: 2,
        gap: '0px',
        classes: ' np-columns flex',
        extraClasses: '',
        id: '',
        columns: [

            {
                type: 'column',
                width: '50%',
                classes: 'np-element np-container',
                extraClasses: '',
                id: '',
                elements: [],
            },

            {
                type: 'column',
                width: '50%',
                classes: 'np-element np-container',
                extraClasses: '',
                id: '',
                elements: []
            }

        ]
    }

    store.currentContainer.push(columns);
    store.currentElement = columns;

    columns.columns[0].index = store.containers.length;
    store.containers.push(columns.columns[0].elements);

    columns.columns[1].index = store.containers.length;
    store.containers.push(columns.columns[1].elements);

}

const addHeading = () => {
    const heading = {
        type: 'heading',
        text: 'Heading',
        level: 'h1',
        classes: ' np-heading',
        id: '',
        align: 'left',
        color: '#000',
        bold: true,
        showLevels: false,
        showAligns: false,
        showElementOptions: false,
        content: '',
        extraClasses: '',
    }
    store.currentContainer.push(heading);
    store.currentElement = heading;
}

const addParagraph = () => {
    const paragraph = {
        type: 'paragraph',
        classes: ' np-paragraph',
        align: 'left',
        color: '#000',
        showAligns: false,
        showElementOptions: false,
        content: '',
        extraClasses: '',
        id: '',
    }
    store.currentContainer.push(paragraph);
    store.currentElement = paragraph;
}

const addImage = () => {
    store.imageMode = 'container';
    store.showImageBrowser = true;
}

const addVideo = () => {

    const video = {
        type: 'video',
        media: null,
        width: 'auto',
        height: 'auto',
        center: false,
        classes: ' np-video',
        extraClasses: '',
        id: '',
    }
    store.currentContainer.push(video);

}

const addShortcode = () => {

    const shortcode = {
        type: 'shortcode',
        codename: '',
        classes: ' np-shortcode',
        extraClasses: '',
        id: '',
    }
    store.currentContainer.push(shortcode);

}

const addGallery = () => {
    const gallery = {
        type: 'gallery',
        mediaElements: [],
        elementsPerRow: 3,
        gap: 10,
        popup: true,
        classes: ' np-gallery',
        extraClasses: '',
        id: '',
    }

    store.currentContainer.push(gallery);
}

</script>