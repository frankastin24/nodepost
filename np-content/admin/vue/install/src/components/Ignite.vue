<template>
    <section v-if="step == 6" class="np-install-section" id="np-mysql-details">

        <h1>{{ langObj['How would you like to start?'] }}</h1>

        <div class="ignite-buttons flex space-between flex-wrap">
            <button class="btn btn-primary" @click="startWithIgnition">{{ langObj['Start With The Ignition Theme']}}</button>
            <button class="btn btn-primary" @click="startWithBlank">{{ langObj['Start With The Blank Theme'] }}</button>
            <button class="btn btn-primary" @click="buildWithAI">{{ langObj['Build The Site With AI'] }}</button>
            <button class="btn btn-primary" @click="startWithIgnition">{{ langObj['Clone an existing site'] }}</button>
        </div>

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ langObj['Previous'] }}</button>
            <button class='btn btn-primary next' @click="finish">{{ langObj['Finish'] }}</button>
        </div>


    </section>
</template>