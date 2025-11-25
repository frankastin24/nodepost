import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
    state: () => ({ 
        rootElement : [],
        currentElement : null,
        currentContainer:null,
        containers : [],

        displayFileBrowser : false,
        fileBrowserMode : 'images',
        currentFolder : '/',
        
        /* image, document, video */

        imageType: 'image',
        currentGallery: null,
        featuredImage: false,
        imageMode: 'container',
        
        /*  featured , container , gallery*/

        displayElements:true,
        activeTab:1,
        revisions: [],
        postStatus: 'Draft',
       

    }),
  })