<template>
<div class="default-element-options"> 
    
    <p class="option flex align-center gap-10"><span>ID : </span><input type="text" v-model="store.currentElement.id" /></p>
    <p class="option flex align-center gap-10"><span>Classes :</span> <input v-model="store.currentElement.extraClasses" type="text"/></p>
    
</div>

</template>
<script setup>

import {useAppStore} from '../../../store/store';
const store = useAppStore();

</script>