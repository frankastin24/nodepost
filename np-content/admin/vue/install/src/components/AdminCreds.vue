<template>

    <section v-if="step == 5" class="np-install-section" id="np-mysql-details">
            
            <h1>{{langObj["Site Credentials"]}}</h1>
            
            <input v-model="username" :placeholder="langObj['Username']" type="text"/>
            <input v-model="password" :placeholder="langObj['Password']" type="password"/>

             <div class="flex nav">
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
               <button class='btn btn-primary next' @click="next">{{langObj['Next']}}</button>
            </div>
            

        </section>


</template>
<script setup>
import {ref,onMounted} from 'vue';
import { useAppStore } from '../store/store';
const store = useAppStore();

const userMessage = ref('');

const username = ref('');
const password = ref('');

const checkUserCreds = () => {
    if(username.value == '') {
       userMessage.value = 'Please enter a Username';
       return false;
    }
    if(password.value == '') {
        userMessage.value = 'Please enter a Password';
       return false;
    }

    return true;
}
const createUser = async () => {

    const params = new URLSearchParams()
  
    params.append('username', username.value)
    params.append('password', password.value)

    await fetch('/np-ajax/?action=create_admin' , {
        method : 'post',
        body : params.toString()
    })

}

const next = () => {
    if(checkUserCreds()) {
        createUser();
        store.step = 5;
    }
}
const prev = () => {
    
    store.step = 3;
    
}
</script>