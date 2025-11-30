<template>
    <section class="np-install-section" id="np-mysql-details">
        <h1>{{ store.langObj["Please Select Your Database"] }}</h1>

        <p>{{ store.langObj["If you have a smaller low traffic website use SQLite"] }}</p>


        <div style="width:300px;margin:auto;margin-top:20px;" class="flex space-between">
            <button :class="['btn btn-primary', (store.database == 'sqlite' ? 'btn-active' : '')]" @click="setDB('sqlite')">
                SQLite
            </button>
            <button :class="['btn btn-primary', (store.database == 'mysql' ? 'btn-active' : '')]" @click="setDB('mysql')">
                MySQL
            </button>
        </div>

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ store.langObj['Previous'] }}</button>
            <button class='btn btn-primary next' @click="next">{{ store.langObj['Next'] }}</button>
        </div>
    </section>
</template>
<script setup>
import { useAppStore } from '../store/store';
const store = useAppStore();
import {ref,onMounted} from 'vue';

const getDB = async () => {
    const response = await fetch('/np-ajax/?action=get_db');
    const text = await response.text();
    store.database = text;
}

const setDB = (db) => {
    store.database = db;
    fetch('/np-ajax/?action=set_db&db='+db);
}
const previous = () => {
    store.step = 1;
}
const next = () => {
    if(store.database == 'sqlite') {
        store.step = 4;
    } else {
        store.step = 3;
    }
}
onMounted(() => {
    getDB();
})
</script>