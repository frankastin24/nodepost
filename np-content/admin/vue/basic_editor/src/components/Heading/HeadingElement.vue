<template>
  <h1
    ref="editable"
    contenteditable="true"
    :innerHTML="modelValue"
    @input="onInput"
    @blur="onInput"
  ></h1>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue']);
const editable = ref(null);

// Emit new value when content changes
function onInput() {
  emit('update:modelValue', editable.value.innerHTML);
}

// Watch for external changes and update contenteditable
watch(() => props.modelValue, (newVal) => {
  if (editable.value && editable.value.innerHTML !== newVal) {
    editable.value.innerHTML = newVal || '';
  }
});
</script>