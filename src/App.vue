<template>
    <v-app>
        <v-container class="pt-8">
            <v-app-bar class="white elevation-15 rounded-lg px-2">
                <v-app-bar-title>
                    <h3 @click.prevent="toHome" class="to-home headline font-weight-bold text-decoration-none black--text">Цитаты</h3>
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
    methods: {
        toHome() {
            if(this.$route.path == '/'){
                this.$store.dispatch('updateQuotes', 1);
                return;
            }
            this.$router.push('/');
        }
    }
}
</script>

<style>
.v-card__title{
    word-break: break-word !important;
}
.to-home{
    cursor: pointer;
}
</style>