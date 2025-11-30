<template>
    <section v-if="step == 4" class="np-install-section" id="np-mysql-details">

        <h1>Site Details</h1>

        <input v-model="siteName" :placeholder="langObj['Site Name']" type="text" />
        <input v-model="siteTagline" :placeholder="langObj['Site Tag Line']" type="text" />

        <div class="flex nav">
            <button class='btn btn-primary' @click="previous">{{ langObj['Previous'] }}</button>
            <button class='btn btn-primary next' @click="next">{{ langObj['Next'] }}</button>
        </div>


    </section>
</template>
<script setup>
import { useAppStore } from '../store/store';
const store = useAppStore();

const siteTitle = ref('');
const siteTagLine = ref('');

const getSiteDetails = async () => {
    const response = await fetch('/np-ajax/?action=get_site_details');
    const siteDetails = await response.json();

    siteTitle.value = siteDetails.site_title;
    siteTagLine.value = siteDetails.site_tag_line;

}

const updateSiteDetails = () => {

    const params = new URLSearchParams()

    params.append('site_title', siteTitle.value)
    params.append('site_tagline', siteTagLine.value)

    fetch('/np-ajax/?action=set_site_details', {
        method: 'post',
        body: params.toString(),
    })

}
</script>