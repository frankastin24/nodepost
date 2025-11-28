<template>
    <div class="columns-options">
        <div class="element-options-aside">
            <h1>Columns</h1>
            <p>Columns are a way to change the page layout and put content side by side.</p>
            <h4>Options</h4>
            <p class="option flex align-center gap-10"><span>Number Of Columns : </span> <input min="2" max="6" @change="changeColumns" type="number" :value="store.currentElement.columns.length"/></p>
            <p class="option flex align-center gap-10"><span>Padding : </span><input  v-model="store.currentElement.padding"/></p>
            </div>
        
    </div>
</template>

<script setup>
import {useAppStore} from '../../../store/store';
const store = useAppStore();
const changeColumns = (e) => {
     
    const currentColumns = store.currentElement.columns.length;
    const newColumns = parseInt(e.target.value)
   

    if(newColumns < currentColumns) {
        const subtract = currentColumns - newColumns;

        store.currentElement.columns.splice(newColumns,subtract);
    } else {
        const add = newColumns - currentColumns;

        for(let x = 0; x < add; x ++) {
            store.currentElement.columns.push({
                type: 'column',
                width: (100 / newColumns)+'%',
                classes: 'np-element np-container',
                extraClasses: '',
                id: '',
                elements: [],
            })
        }

        store.currentElement.columns.forEach((column) => {
            column.width = (100 / newColumns)+'%';
        })
    }

}

</script>
