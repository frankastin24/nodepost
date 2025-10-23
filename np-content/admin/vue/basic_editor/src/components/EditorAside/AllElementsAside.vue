<template>
<div class="all-element-options"> 
    
    <p class="small">ID:</p>
    <input type="text" v-model="element.id" />

    <p class="small">Classes:</p>
    <input v-model="element.extraClasses" type="text"/>

</div>

</template>
<script setup>

import {useAppStore} from '../../store/store';
const store = useAppStore();

</script>