import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
    state: () => ({ 
        rootElement : [],
        currentElement : null,
        currentContainer:null,
        containers : [],
        showImageBrowser : true,
        displayElements:true
    }),
  })