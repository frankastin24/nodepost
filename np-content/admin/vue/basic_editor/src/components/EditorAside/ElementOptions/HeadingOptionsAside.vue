<template>
<div class="element-options-aside">
<h1>Heading</h1>
<p>A heading is a short title that labels a section of content, helping readers quickly understand what the following text is about and making the structure easier to navigate.</p>
<h4>Options</h4>
<p class="option flex align-center gap-10"><span>Width : </span> <input v-model="store.currentElement.width"/></p>
<p class="option flex align-center gap-10"><span>Padding : </span><input  v-model="store.currentElement.padding"/></p>
</div>
</template>

<script setup>

import {useAppStore} from '../../../store/store';
const store = useAppStore();

</script>
