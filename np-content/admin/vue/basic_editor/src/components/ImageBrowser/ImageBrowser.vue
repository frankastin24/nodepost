<template>
  <div v-if="store.showImageBrowser" id="image-browser">
    <div class="flex space-between">
      <h1>Image Browser</h1>
      <div class="close" @click="store.showImageBrowser = false"><h1>X</h1></div>
    </div>
    <h2>images{{ currentFolder.replaceAll('/',' | ') }}</h2>

    <div class="file-browser-container">
      <div class="file-browser flex flex-wrap">
        <!-- Upload Image -->
        <div @click="uploadImage" class="upload-image file-browser-item">
          <img width="50px" src="/np-content/admin/img/image-upload.svg" />
          <p class="small">Upload Image</p>
        </div>
        <!-- Up One Folder -->
        <div v-if="currentFolder !== '/'" @click="moveUpFolder" class="up-one-level file-browser-item">
          <img width="50" src="/np-content/admin/img/folder-up.svg" />
        </div>
        <!-- Folders -->
        <div
          v-for="folder in folders"
          :key="folder.name"
          @dragover.prevent="onDragOverFolder($event)"
          @drop="moveFileIntoFolder($event, folder)"
          class="folder file-browser-item"
          @click="changeFolder(folder)"
          @dragout="onDragOutFolder($event)"
        >
          <img width="50" src="/np-content/admin/img/folder.svg" />
          <p class="small" v-if="!folder.editName">{{ folder.name }}</p>
          <input
            @click.stop=""
            @keydown.enter="changeFileFolderName(folder)"
            v-if="folder.editName"
            type="text"
            v-model="folder.newName"
          />
        </div>
        <!-- New Folder Input -->
        <div v-if="displayNewFolder" class="new-folder file-browser-item">
          <img width="50" src="/np-content/admin/img/folder.svg" />
          <input
            ref="newFolderInput"
            @keydown.enter="createFolder"
            type="text"
            v-model="newFolderName"
          />
        </div>
        <!-- Add New Folder Button -->
        <div @click="showNewFolder" class="folder file-browser-item">
          <img width="50" src="/np-content/admin/img/folder-add.svg" />
          <p class="small">Add New Folder</p>
        </div>
        <!-- Files -->
        <div
          v-for="file in files"
          :key="file.name"
          draggable="true"
          @dragstart="dragFileStart($event, file)"
          :class="['file', 'file-browser-item', (file.selected ? 'selected' : '')]"
          @click="selectImage(file)"
        >
          <div :style="imageStyles(file)"></div>
          <p class="small" @click.stop="file.editName = true" v-if="!file.editName">{{ file.name }}</p>
          <input
            @click.stop=""
            v-if="file.editName"
            @keydown.enter="changeFileFolderName(file)"
            type="text"
            v-model="file.newName"
          />
        </div>
      </div>
    </div>
    <input ref="fileUpload" style="display:none;" type="file" @change="uploadFile" />
    <button class="btn btn-large add-selected-images" @click="addImages">Add Selected Images</button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useAppStore } from '../../store/store'

const store = useAppStore()
const folders = ref([])
const files = ref([])
const currentFolder = ref('/')
const displayNewFolder = ref(false)
const newFolderName = ref('')
const fileUpload = ref(null)
const uploadsFilePath = ref('/np-content/uploads/images')
const newFolderInput = ref(null)

// Fetch folder contents on mount
onMounted(() => {
  updateFolderContents()
})

// --- Utility and Action Methods ---
const onDragOverFolder = (e) => {
  e.target.style.border = "2px solid blue";
}

const onDragOutFolder = () => {
   e.target.style.border = "1px solid black";
}
const updateFolderContents = async () => {
  const params = new URLSearchParams()
  params.append('filePath', uploadsFilePath.value + currentFolder.value)

  const response = await fetch('/api/np-admin/get-directory-contents/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })
  const directoryContents = await response.json()
  folders.value = directoryContents.folders.map((name) => ({
    name, editName: false, newName: name
  }))
  files.value = directoryContents.files.map((name) => ({
    name, editName: false, selected: false, newName: name
  }))
}

const imageStyles = (file) => ({
  backgroundImage: `url("${uploadsFilePath.value + currentFolder.value + '/' + file.name}")`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  width: '50px',
  height: '50px',
  backgroundRepeat: 'no-repeat'
})

const uploadImage = () => {
  fileUpload.value.click()
}

const uploadFile = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('filename', file.name)
  formData.append('folder', currentFolder.value || '')
  formData.append('image', file)

  await fetch('/api/np-admin/upload-image', {
    method: 'POST',
    body: formData
  })

  updateFolderContents()
}

const dragFileStart = (e, file) => {
  e.dataTransfer.setData('filename', file.name)
}

const moveFileIntoFolder = async (e, folder) => {
  const fileName = e.dataTransfer.getData('filename')
  const params = new URLSearchParams()
  params.append('oldPath', uploadsFilePath.value + currentFolder.value + '/' + fileName)
  params.append('newPath', uploadsFilePath.value + currentFolder.value + '/' + folder.name + '/' + fileName)

  await fetch('/api/np-admin/rename-file-or-folder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  updateFolderContents()
}

const showNewFolder = async () => {
  displayNewFolder.value = true
  await nextTick()
  newFolderInput.value?.focus()
}

const createFolder = async () => {
  if (newFolderName.value === '') {
    alert('Please enter a folder name')
    return
  }
  const foundFolders = folders.value.find(folder => folder.name === newFolderName.value)
  if (foundFolders) {
    alert('Folder with name already exists, please enter a unique name')
    return
  }

  const params = new URLSearchParams()
  params.append('folderPath', uploadsFilePath.value + currentFolder.value + newFolderName.value)

  await fetch('/api/np-admin/create-directory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  folders.value.push({
    name: newFolderName.value,
    editName: false,
    newName: newFolderName.value
  })
  displayNewFolder.value = false
  newFolderName.value = ''
  updateFolderContents()
}

const changeFileFolderName = async (file) => {
  const params = new URLSearchParams()
  params.append('oldPath', uploadsFilePath.value + currentFolder.value + '/' + file.name)
  params.append('newPath', uploadsFilePath.value + currentFolder.value + '/' + file.newName)

  await fetch('/api/np-admin/rename-file-or-folder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  file.name = file.newName
  file.editName = false
  updateFolderContents()
}

const moveUpFolder = () => {
  if (currentFolder.value === '/') return
  const segments = currentFolder.value.split('/').filter(Boolean)
  segments.pop()
  currentFolder.value = '/' + segments.join('/')
  updateFolderContents()
}

const changeFolder = (folder) => {
  currentFolder.value = currentFolder.value.replace(/\/$/, '') + '/' + folder.name
  updateFolderContents()
}

const selectImage = (file) => {
  file.selected = !file.selected
}

const addImages = () => {
  const selectedImages = files.value.filter((img) => img.selected)
  selectedImages.forEach((img) => {
    const image = new window.Image()
    image.src = uploadsFilePath.value + currentFolder.value + '/' + img.name

    const imageObj = {
      type: 'image',
      src: uploadsFilePath.value + currentFolder.value + '/' + img.name,
      width: 'auto',
      height: 'auto',
      cover: false,
      contain: false,
      grayscale: false,
      sepia: false,
      width: image.width,
      height: image.height,
      opacity: 1,
      blur: '0%'
    }

    store.currentContainer.push(imageObj)
    store.currentElement = imageObj
  })
  store.showImageBrowser = false
}
</script>