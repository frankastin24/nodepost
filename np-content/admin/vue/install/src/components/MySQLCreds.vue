<template>
    <section  class="np-install-section" id="np-mysql-details">

        <h1>{{ store.langObj['MySQL Credentials'] }}</h1>
        <p>{{ store.langObj['Ensure you have mysql installed on your system.'] }} <a
                href="https://nodepost.org/install-mysql">{{ _pStores.langObj["If you don't know how to install it click here!"]}}</a></p>

        <input v-model="databaseCreds.host" :placeholder="_pStores.langObj['Database Host']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.name" :placeholder="_pStores.langObj['Database Name']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.username" :placeholder="_pStores.langObj['Database Username']" value="localhost"
            type="text"></input>
        <input v-model="databaseCreds.password" :placeholder="_pStores.langObj['Database Password']" value="localhost"
            type="text"></input>

        <p class="error">{{ databaseError }}</p>
        <p v-if="connectionOK" class="success"></p>

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ _pStores.langObj['Previous'] }}</button>

            <button class="btn btn-primary next" @click="testConnection">Test Connection</button>
        </div>

    </section>
</template>

<script setup>
import { useAppStore } from '../store/store';
import {ref} from 'vue'

const connectionOK = ref(false);
const store = useAppStore();

const databaseCreds = ref({
    host: 'localhost',
    name : '',
    username : '',
    password : '',
})

const setMySQLCreds = async () => {
    const params = new URLSearchParams()
    params.append('host', databaseCreds.value.host)
    params.append('name', databaseCreds.value.name)
    params.append('username', databaseCreds.value.username)
    params.append('password', databaseCreds.value.password)
    await fetch('/np-ajax/action=set_mysql_creds', {
        method : 'post',
        body : params.toString() 
    })
}

const testConnection = async () => {
    await setMySQLCreds();
    
    const response = await fetch('/np-ajax/?test_mysql_creds');
    
    const isOK = await response.text();

    if(isOK == 'success') {
       
    } else {

    }

}

const getMySQLCreds = () => {

}
</script>