<template>
    <div class="install">
    
    <p class="version">©2025 <a href="https://fuseolution.com">Fuseolution</a> | Version 0.5 </p>
        <section v-if="step == 1" class="np-install-section" id="np-select-lang">

            <h1>{{langObj["Thanks for choosing NodePost!"]}}</h1>
            <h2>{{langObj["Let's get started."]}}</h2>

            <h3>{{languageTicker}}</h3>

            <select @change="changeLang" selected="en" v-model="lang">
                <option value="en">
                    English
                </option>
                 <option value="fr">
                    Francais 
                </option>
                 <option value="es">
                    Espanyol 
                </option>
            </select>


            <a href="https://nodepost.org/request_lanuage">{{langObj["Language not listed?"]}}</a>

           
            <div class="flex nav">
            <button class='btn btn-primary next' @click="changeStep(2)">{{langObj['Next']}}</button>
            </div>

        </section>
         <section v-if="step == 2" class="np-install-section" id="np-mysql-details">
            <h1>{{langObj["Please Select Your Database"]}}</h1>

            <p>{{langObj["If you have a smaller low traffic website use SQLite"]}}</p>
            

            <div style="width:300px;margin:auto;margin-top:20px;" class="flex space-between">
                <button :class="['btn btn-primary',(database == 'sqlite' ? 'btn-active' : '')]" @click="database = 'sqlite'">
                    SQLite
                </button>
                <button :class="['btn btn-primary', (database == 'mysql'? 'btn-active' : '')]" @click="database = 'mysql'">
                    MySQL
                </button>
            </div>

            <div class="flex nav">
               <button class='btn btn-primary' @click="prevStep(1)">{{langObj['Next']}}</button>
               <button class='btn btn-primary next' @click="changeStep(3)">{{langObj['Next']}}</button>
            </div>
         </section>
        <section v-if="step == 3" class="np-install-section" id="np-mysql-details">
            
            <h1>MySQL Credentials</h1>
            <p>Ensure you have mysql installed on your system. <a href="https://nodepost.org/install_mysql">Click here if you don't know how to install it.</a></p>
            
            <input v-model="databaseCreds.host" placeholder="Database Host" value="localhost" type="text"></input>
            <input v-model="databaseCreds.name" placeholder="Database Name" value="localhost" type="text"></input>
            <input v-model="databaseCreds.username" placeholder="Database Username" value="localhost" type="text"></input>
            <input v-model="databaseCreds.password" placeholder="Database Password" value="localhost" type="text"></input>
            
            <p class="error">{{databaseError}}</p>
            
            <div class="flex nav">
                <button class="btn btn-primary" @click="prevStep(2)">Previous</button>
                <button class="btn btn-primary next" @click="testConnection">Test Connection</button>
            </div>

        </section>

        <section v-if="step == 4" class="np-install-section" id="np-mysql-details">
            
            <h1>Site Details</h1>
            
            <input v-model="siteName" placeholder="Site Name" type="text"/>
            <input v-model="siteTagline" placeholder="Site Tag Line" type="text"/>

            <div class="flex nav">
              <button class="btn btn-primary" @click="prevStep(3)">Previous</button>
             <button class="btn btn-primary next" @click="changeStep(5)">Next</button>
            </div>
            

        </section>
        <section v-if="step == 5" class="np-install-section" id="np-mysql-details">
            
            <h1>Site Details</h1>
            
            <input v-model="siteName" placeholder="Site Name" type="text"/>
            <input v-model="siteTagline" placeholder="Site Tag Line" type="text"/>

            <div class="flex nav">
              <button class="btn btn-primary" @click="changeStep(3)">Previous</button>
             <button class="btn btn-primary" @click="changeStep(3)">Previous</button>
            </div>
            

        </section>
        

    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
const step = ref(1);
let languageTickerIndex = 0;
let lang = 'en';
const langObj = ref({})
const database = ref('sqlite');

const databaseCreds = ref({
    host: 'localhost',
    name : '',
    username : '',
    password : '',
})

const changeStep = (newStep) => {
    if(newStep == 3) {
        if(database.value == 'sqlite') {
           newStep = 4;
        }
    }
    
    step.value = newStep;
}

const getLangObj = async (lang) => {
   const response = await fetch('/languages/'+lang +'.json');
   const json = await response.json()
   langObj.value = json;
}

const getCurrentLang = async () => {
   const response = await fetch('/np-ajax/?action=get_current_lang');
   const text = await response.text()
   lang = text;
   getLangObj(lang);
}

const setCurrentLang = async (newLang) => {
    await fetch('/np-ajax/?action=set_current_lang&lang='+newLang);
    
    getLangObj(newLang);
}

const changeLang = async (e) => {
    
    setCurrentLang(e.target.value);

}


const getInstallStep = async () => {
    const response = await fetch('/np-ajax/?action=get_install_step');
    const step = (await response).text();
    step.value = parseInt(step);
}

const setStep = async (step) => {
    fetch('/np-ajax/?action=set_install_step&step='+step.value);
}

const languagesForTicker = [
    "Please select your language",
    "Por favor seleccione su idioma",
    "Veuillez sélectionner votre langue",
    "请选择您的语言"
]

const languageTicker = ref(languagesForTicker[0]);

onMounted(async () => {
    
    getCurrentLang();
    
    getInstallStep();

    setInterval(() => {
       languageTickerIndex ++;
       const numLangs = languagesForTicker.length - 1;
       if(languageTickerIndex > numLangs) {
          languageTickerIndex = 0;
       }
       languageTicker.value = languagesForTicker[languageTickerIndex];

    }, 2000)
})



</script>
