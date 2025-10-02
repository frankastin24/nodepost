<template>
<div @click.stop="selectElement(element)">
        <div v-if="element == store.currentElement" class="heading-options flex">
           <div @click.stop="showLevelDropdown()" class="select-level">
            
            <h4>H1</h4>

            <ul  v-if="showLevels">
                <li v-if="element.level != 'h1'" @click="changeLevel(element,'h1',showLevels)">H1</li>
                <li v-if="element.level != 'h2'" @click="changeLevel(element,'h2',showLevels)">H2</li>
                <li v-if="element.level != 'h3'" @click="changeLevel(element,'h3',showLevels)">H3</li>
                <li v-if="element.level != 'h4'" @click="changeLevel(element,'h4',showLevels)">H4</li>
                <li v-if="element.level != 'h5'" @click="changeLevel(element,'h5',showLevels)">H5</li>
                <li v-if="element.level != 'h6'" @click="changeLevel(element,'h6',showLevels)">H6</li>
            </ul>

           </div>
           
           <div @mousedown.prevent="wrapSelection('strong')" class="bold">B</div>
           <div @mousedown.prevent="wrapSelection('em')" class="italic">i</div>
           
           <input type="color" v-model="element.color" />
           
           <div class="select-align" @click="showAlignDropdown">
            <h4>{{displayAlign(element)}}</h4>
            <ul style="" v-if="showAligns"> 
                <li @click="changeAlign('left',element)">L</li>
                <li @click="changeAlign('center',element)">C</li>
                <li @click="changeAlign('right',element)">R</li>
            </ul>
           </div>
           <div @click="showElementOptionsDropdown" class="element-options">
            
            <h4>...</h4>

            <ul v-if="displayElementOptions">
                <li @click="duplicate(element)">Duplicate</li>
                <li @click="cut(element)">Cut</li>
                <li @click="copy(element)">Copy</li>
                <li @click="remove(element)">Delete</li>
            </ul>
        </div>
           
        </div>
    
        <h1 contentEditable="true" :class="element.classes" :style="elementStyles(element)"></h1>
      
    </div>
    </template>
<script setup>
import {ref} from 'vue';
import {useAppStore} from '../store/store';
const store = useAppStore();
defineProps(['element']);

const showLevels = ref(false);
const showAligns = ref(false);
const displayElementOptions = ref(false);

const showLevelDropdown = () => {
    showLevels.value = !showLevels.value;
    showAligns.value = false;
    displayElementOptions.value = false;
}

const showAlignDropdown = () => {
    showLevels.value = false;
    showAligns.value = !showAligns.value;
    displayElementOptions.value = false;
}

const showElementOptionsDropdown = () => {
    showLevels.value = false;
    showAligns.value = false;
    displayElementOptions.value = !displayElementOptions.value;
}

const selectElement = (element) => {
    store.currentElement = element;
}

const wrapSelection = (tag) => {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return; // Nothing selected

  // Prevent nested tags by unwrapping if already inside
  const parentTag = sel.anchorNode.parentElement?.tagName.toLowerCase();
  if (parentTag === tag) {
    // Unwrap: replace parent with its inner HTML
    const parent = sel.anchorNode.parentElement;
    if (parent) {
      parent.outerHTML = parent.innerHTML;
    }
    emitContent();
    return;
  }

  // Wrap
  const wrapper = document.createElement(tag);
  try {
    range.surroundContents(wrapper);
  } catch (e) {
    // If selection is across multiple elements, fallback: just use execCommand
    document.execCommand(tag === 'strong' ? 'bold' : 'italic', false, null);
  }

  // Move caret after wrapper (optional)
  sel.removeAllRanges();
  const after = document.createRange();
  after.setStartAfter(wrapper);
  after.collapse(true);
  sel.addRange(after);
}

const displayAlign = (element) => {
    let letter = 'L';
    switch (element.align) {
        case 'left' :
            letter = 'L';
        break;
        
        case 'center' :
            letter = 'C';
        break;
        
        case 'right' :
            letter = 'R';
        break;
    }
    return letter;

}
const changeLevel = (element,level) => {
    element.level = level;
    
}
const changeAlign = (align,element) => {
    element.align = align;
    
}


const elementStyles = (element) => {

    const fontSizes = {
        h1 : '40px',
        h2 : '35px',
        h3 : '30px',
        h4 : '25px',
        h5 : '20px',
        h6 : '15px'
    }

    return {
        fontSize : fontSizes[element.level],
        color: element.color,
        textAlign:element.align
    }
}
</script>