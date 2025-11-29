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
            <button class='btn btn-primary next' @click="next()">{{langObj['Next']}}</button>
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
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
               <button class='btn btn-primary next' @click="next">{{langObj['Next']}}</button>
            </div>
         </section>
        <section v-if="step == 3" class="np-install-section" id="np-mysql-details">
            
            <h1>{{langObj['MySQL Credentials']}}</h1>
            <p>{{langObj['Ensure you have mysql installed on your system.']}} <a href="https://nodepost.org/install-mysql">{{langObj["If you don't know how to install it click here!"]}}</a></p>
            
            <input v-model="databaseCreds.host" :placeholder="langObj['Database Host']" value="localhost" type="text"></input>
            <input v-model="databaseCreds.name" :placeholder="langObj['Database Name']" value="localhost" type="text"></input>
            <input v-model="databaseCreds.username" :placeholder="langObj['Database Username']" value="localhost" type="text"></input>
            <input v-model="databaseCreds.password" :placeholder="langObj['Database Password']" value="localhost" type="text"></input>
            
            <p class="error">{{databaseError}}</p>
            
            <div class="flex nav">
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
              
                <button class="btn btn-primary next" @click="testConnection">Test Connection</button>
            </div>

        </section>

        <section v-if="step == 4" class="np-install-section" id="np-mysql-details">
            
            <h1>Site Details</h1>
            
            <input v-model="siteName" :placeholder="langObj['Site Name']" type="text"/>
            <input v-model="siteTagline" :placeholder="langObj['Site Tag Line']" type="text"/>

            <div class="flex nav">
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
               <button class='btn btn-primary next' @click="next">{{langObj['Next']}}</button>
            </div>
            

        </section>
        <section v-if="step == 5" class="np-install-section" id="np-mysql-details">
            
            <h1>{{langObj["Site Credentials"]}}</h1>
            
            <input v-model="username" :placeholder="langObj['Username']" type="text"/>
            <input v-model="password" :placeholder="langObj['Password']" type="password"/>

             <div class="flex nav">
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
               <button class='btn btn-primary next' @click="next">{{langObj['Next']}}</button>
            </div>
            

        </section>

        <section v-if="step == 6" class="np-install-section" id="np-mysql-details">
            
            <h1>{{langObj['How would you like to start?']}}</h1>
            
            <div class="flex space-between">
                <button class="btn btn-primary" @click="startWithIgnition">{{langObj['Start With The Ignition Theme']}}</button>
                <button class="btn btn-primary" @click="startWithBlank">{{langObj['Start With The Blank Theme']}}</button>
                <button class="btn btn-primary" @click="buildWithAI">{{langObj['Build The Site With AI']}}</button>
                <button class="btn btn-primary" @click="startWithIgnition">{{langObj['Clone an existing site']}}</button>
            </div>

             <div class="flex nav">
               <button class='btn btn-primary' @click="previous">{{langObj['Previous']}}</button>
               <button class='btn btn-primary next' @click="finish">{{langObj['Finish']}}</button>
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

const siteTitle = ref('');
const siteTagLine = ref('');

const username = ref('');
const password = ref('');
const userMessage = ref('');

const databaseCreds = ref({
    host: 'localhost',
    name : '',
    username : '',
    password : '',
})

const next = () => {
    
    let newStep = step.value + 1;

    if(newStep == 3) {
        if(database.value == 'sqlite') {
           newStep = 4;
        }
    }
    
    step.value = newStep;
    setCurrentStep(newStep);
}

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

const previous = () => {
    
    let newStep = step.value - 1;

    if(newStep == 3) {
        if(database.value == 'sqlite') {
           newStep = 2;
        }
    }
    
    step.value = newStep;
    setCurrentStep(newStep);
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

const setCurrentStep = async (step) => {
    await fetch('/np-ajax/?action=set_current_step&step='+step);
    
}

const changeLang = async (e) => {
    
    setCurrentLang(e.target.value);

}


const getInstallStep = async () => {
    const response = await fetch('/np-ajax/?action=get_install_step');
    const currentStep = await response.text();
    step.value = parseInt(currentStep);
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
