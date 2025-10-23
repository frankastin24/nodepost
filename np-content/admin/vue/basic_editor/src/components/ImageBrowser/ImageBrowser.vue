<template>
  <div v-if="store.showImageBrowser" id="image-browser">
    <div class="flex space-between">
    <h1>Image Browser</h1>
    <div class="close" @click="store.showImageBrowser = false"><h1>X</h1></div>
    </div>
    <h2>images{{ currentFolder.replaceAll('/',' | ') }}</h2>

    <div class="file-browser-container">
      <div class="file-browser flex flex-wrap">
        <div @click="uploadImage" class="upload-image file-browser-item">
          <img width="50px" src="/np-content/admin/img/image-upload.svg" />
          <p class="small">Upload Image</p>
        </div>
        <div v-if="currentFolder !== '/'" @click="moveUpFolder" class="up-one-level file-browser-item">
          <img width="50" src="/np-content/admin/img/folder-up.svg" />
        </div>

        <div class="folder file-browser-item" v-for="folder in folders" :key="folder.name"
          @click="changeFolder(folder)">
          <img width="50" src="/np-content/admin/img/folder.svg" />
          <p class="small" v-if="!folder.editName">{{ folder.name }}</p>
          <input @click.stop="" @keydown.enter="changeFileFolderName(folder)" v-if="folder.editName" type="text" v-model="folder.newName" />
        </div>

        <div v-if="displayNewFolder" class="new-folder file-browser-item">
          <img width="50" src="/np-content/admin/img/folder.svg" />
          <input ref="newFolderInput" @keydown.enter="createFolder" type="text" v-model="newFolderName" />
        </div>

        <div @click="showNewFolder" class="folder file-browser-item">
          <img width="50" src="/np-content/admin/img/folder-add.svg" />
          <p class="small">Add New Folder</p>
        </div>

        <div v-for="file in files" :key="file.name"
          :class="['file', 'file-browser-item', (file.selected ? 'selected' : '')]" @click="selectImage(file)">
          <div :style="imageStyles(file)"></div>
          <p class="small" @click.stop="file.editName = true" v-if="!file.editName">{{ file.name }}</p>
          <input @click.stop="" v-if="file.editName" @keydown.enter="changeFileFolderName(file)" type="text" v-model="file.newName" />
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

onMounted(() => {
  updateFolderContents()
})





const imageStyles = (file) => ({
  backgroundImage: 'url("' + uploadsFilePath.value + currentFolder.value + '/' + file.name + '")',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  width: '50px',
  height: '50px',
  backgroundRepeat: 'no-repeat'
})

const uploadImage = () => {
  fileUpload.value.click()
}

const showNewFolder = async () => {
  displayNewFolder.value = true
  await nextTick()
  newFolderInput.value?.focus()
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

  updateFolderContents() // Refresh after upload
}

const selectImage = (file) => {
  file.selected = !file.selected
}

const createFolder = async () => {

  if(newFolderName.value == '' ) {
    return alert("Please enter a folder name")
  }
  const foundFolders = folders.value.find((folder) => {
    return folder.name == newFolderName.value;
  })

  if(foundFolders) {
    return alert("Folder with name already exists, please enter a unquiqe name")
  }


  const params = new URLSearchParams()
  
  params.append('folderPath', uploadsFilePath.value + currentFolder.value + newFolderName.value );
  
  const response = await fetch('/api/np-admin/create-directory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })

  folders.value.push({
    name: newFolderName.value,
    editName:false,
    newName : newFolderName
  })
  displayNewFolder.value = false;
  newFolderName.value = '';
}
const changeFileFolderName = async (file) => {
  const params = new URLSearchParams()
  params.append('oldPath', uploadsFilePath.value + currentFolder.value + file.name)
  params.append('newPath', uploadsFilePath.value + currentFolder.value + file.newName)
  file.name = file.newName;
  file.editName = false;
  
  const response = await fetch('/api/np-admin/rename-file-or-folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
}

const updateFolderContents = async () => {
  const params = new URLSearchParams()
  params.append('filePath', uploadsFilePath.value + currentFolder.value)

  const response = await fetch('/api/np-admin/get-directory-contents/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })

  const directoryContents = await response.json()
  folders.value = directoryContents.folders.map((name) => ({
    name, editName: false, newName : name
  }))
  files.value = directoryContents.files.map((name) => ({
    name, editName: false, selected: false, newName: name
  }))
}

const addImages = () => {
  const selectedImages = files.value.filter((img) => img.selected)
 
  selectedImages.forEach((img) => {
     
    const image = new Image();
    image.src = uploadsFilePath.value + currentFolder.value + '/' + img.name;

    const imageObj = {
      type: 'image',
      src: uploadsFilePath.value + currentFolder.value + '/' + img.name,
      width: 'auto',
      height: 'auto',
      cover: false,
      contain: false,
      grayscale: false,
      sepia:false,
      width:image.width,
      height:image.height,
      opacity: 1
    }
    store.currentContainer.push(imageObj)
    store.currentElement = imageObj
   
  })
}

// Optionally implement createFolder and changeFileName handlers
</script>