<template>
  <div v-if="element === store.currentElement" class="all-element-options flex">
    <div
      type="button"
      class="bold"
      title="Bold"
      @mousedown.prevent="wrapSelection('b')"
      aria-label="Bold"
    >B</div>
    <div
      type="button"
      class="italic"
      title="Italic"
      @mousedown.prevent="wrapSelection('em')"
      aria-label="Italic"
    >i</div>
    <input
      type="color"
      @change.prevent="changeColor"
      title="Text color"
      aria-label="Text color"
    />
    <SelectAlign :element="element"/>
    <MoveElement :element="element"/>
    <ElementOptions :element="element"/>
  </div>
</template>

<script setup>
import { useAppStore } from '../../store/store'
import SelectAlign from './SelectAlign.vue'
import MoveElement from '../MoveElement.vue'
import ElementOptions from '../ElementOptions.vue'

const store = useAppStore()
defineProps(['element'])

/**
 * Emits a change event for syncing content.
 * Call this after making a change to the DOM.
 */
function emitContent() {
  // You may want to emit an event here if the parent needs to sync.
  // For example: emit('update:content', element.content)
}

/**
 * Wraps the current text selection in a given tag.
 * If already wrapped, unwraps.
 */
function wrapSelection(tag) {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return

  const range = sel.getRangeAt(0)
  if (range.collapsed) return // Nothing selected

  // Detect if selection is already wrapped in the tag
  const anchorEl = sel.anchorNode.parentElement
  if (anchorEl && anchorEl.tagName.toLowerCase() === tag) {
    // Unwrap: replace parent with its child nodes
    const parent = anchorEl
    const fragment = document.createDocumentFragment()
    while (parent.firstChild) {
      fragment.appendChild(parent.firstChild)
    }
    parent.replaceWith(fragment)
    emitContent()
    return
  }

  // Wrap selection
  const wrapper = document.createElement(tag)
  try {
    range.surroundContents(wrapper)
  } catch (e) {
    // Fallback for complex selections: use execCommand (deprecated but still works)
    document.execCommand(tag === 'b' || tag === 'strong' ? 'bold' : 'italic')
  }

  // Move caret after wrapper (optional)
  sel.removeAllRanges()
  const after = document.createRange()
  after.setStartAfter(wrapper)
  after.collapse(true)
  sel.addRange(after)
  emitContent()
}

/**
 * Changes the color of the current selection.
 * If already colored, updates color.
 */
function changeColor(event) {
    const sel = window.getSelection();
    const color = event.target.value;
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  // Always wrap the full selection in a new span
  const wrapper = document.createElement('span');
  if (color) wrapper.style.color = color;

  // Surround contents (will unwrap any nested spans inside selection)
  try {
    range.surroundContents(wrapper);
  } catch (e) {
    // If selection is across multiple nodes, fallback: use execCommand
    document.execCommand('foreColor', false, color || '#000');
  }

  // Move caret after new span (optional)
  sel.removeAllRanges();
  const after = document.createRange();
  after.setStartAfter(wrapper);
  after.collapse(true);
  sel.addRange(after);

}
</script>
