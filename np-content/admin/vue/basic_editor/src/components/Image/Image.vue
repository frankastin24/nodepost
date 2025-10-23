<template>
   <div class="image np-element" :style="imageStyles(element)" >
   <ImageOptions :element="element"/>
   </div>
</template>
<script setup>
defineProps(['element']);
import ImageOptions from './ImageOptions.vue';

const imageStyles = (element) => {

    let backgroundSize = `${element.width} ${element.height}`;

    if(element.cover) {
        backgroundSize = 'cover';
    }

    if(element.contain) {
        backgroundSize = 'contain';
    }

    let filter = "none";
    if(element.greyScale) {
        filter = 'greyscale';
    }

    if(element.sepia) {
        filter = 'sepia';
    }
    

    return {
        width:element.width,
        height:element.height,
        backgroundImage: `url("${element.src}")`,
        backgroundSize,
        filter,
    }

}

</script>
