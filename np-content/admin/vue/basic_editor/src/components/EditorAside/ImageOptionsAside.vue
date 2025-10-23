<template>
    <div class="flex">
    <input type="checkbox" v-model="store.currentElement.greyscale"/>
    <p>Black & White</p>
    </div>
    <div class="flex">
    <input type="text" v-model="store.currentElement.blur"/>
    <p>Blur</p>
    </div>
    <div class="flex">
    <input type="text" v-model="store.currentElement.brightness"/>
    <p>Brightness</p>
    </div>
     <div class="flex">
    <input type="text" v-model="store.currentElement.opacity"/>
    <p>Opacity</p>
    </div>
</template>