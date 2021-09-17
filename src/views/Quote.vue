<template>
    <v-container v-if="error">
        <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="600">
            <v-card-title class="justify-center">
                {{ error }}
            </v-card-title>
            <v-card-text class="pt-1 d-flex justify-center">
                <v-btn to="/" plain color="green" outlined>
                    Вернуться
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
    <v-container v-else-if="!quote">
        <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg"
        max-width="600">
            <v-skeleton-loader
                type="article"
                ></v-skeleton-loader>
            <v-skeleton-loader
                class="small-button-skelet"
                type="button"
                ></v-skeleton-loader>
            <v-skeleton-loader
                class="my-4 big-button-skelet"
                type="button"
                ></v-skeleton-loader>
            <div></div>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="600">
            <v-card-title>
                {{ quote.author }}
            </v-card-title>
            <v-card-subtitle>
                <date-format :date="quote.created_at"></date-format>
            </v-card-subtitle>
            <v-card-text>
                {{ quote.quote }}
            </v-card-text>
            <v-card-text class="pt-0">
                <v-chip v-for="tag in quote.tags" :key="tag.name"
                    label
                    outlined
                    color="green"
                    class="mr-3 mt-2">
                        {{ tag.name }}
                    </v-chip>
            </v-card-text>
            <v-card-text class="pt-1">
                <v-btn :to="{ name: 'Home', query: { page: page }}" plain color="green" outlined>
                    Вернуться
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { getQuoteById } from '../api';
    import DateFormat from '../components/DateFormat.vue';

    export default {
        name: 'Quote',
        components: {
            DateFormat
        },
        props:{
            id: Number,
            page: Number
        },
        data() {
            return {
                quote: null,
                maxPage: null,
                error: null
            }
        },
        mounted() {
            getQuoteById(this.$route.params.id).then((result) => {
                this.quote = result.data;
            }).catch(err => {
                if(err.response.status == 404){
                    this.error = "Цитата не найдена";
                    return;
                }
                this.error = "Произошла ошибка";
            })
        }
    }
</script>

<style>
.v-application--is-ltr .v-card .v-skeleton-loader__article .v-skeleton-loader__heading{
    margin: 16px 0px;
}
.v-card .v-skeleton-loader__article .v-skeleton-loader__paragraph{
    padding: 16px 0px;
}
.big-button-skelet .v-skeleton-loader__button{
    width: 108px;
}
.small-button-skelet .v-skeleton-loader__button{
    width: 82px;
}
</style>