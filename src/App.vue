<template>
    <v-app>
        <v-container class="pt-8">
            <v-app-bar class="white elevation-15 rounded-lg px-2">
                <v-app-bar-title>
                    <router-link to="/?page=1" class="headline font-weight-bold text-decoration-none black--text">Цитаты</router-link>
                </v-app-bar-title>
                <v-spacer></v-spacer>
                <create-quote></create-quote>
            </v-app-bar>
        </v-container>
        <v-main class="mt-8">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import CreateQuote from './components/CreateQuote.vue';
export default {
    components: {
        CreateQuote
    },
}
</script>

<style>
.v-card__title{
    word-break: break-word !important;
}
</style>