<template>
<div @click="showElementOptionsDropdown(element)" class="element-options">
    
    <h4>...</h4>

    <ul v-if="element.displayElementOptions">
        <li @click="duplicate(element)">Duplicate</li>
        <li @click="cut(element)">Cut</li>
        <li @click="copy(element)">Copy</li>
        <li @click="remove(element)">Delete</li>
    </ul>

</div>
    
</template>
<script setup>
defineProps(['element']);

const showElementOptionsDropdown = (element) => {
    element.displayElementOptions = !element.displayElementOptions;
    element.showLevels = false;
    element.showAligns = false;
    
}
</script>