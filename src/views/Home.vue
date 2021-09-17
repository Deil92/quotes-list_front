<template> 
    <v-container v-if="!quotes.length">
        <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg"
        max-width="600" v-for="n in 10" :key="n">
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
        max-width="600" v-for="q in quotes" :key="q.id">
            <v-card-title>
                {{ q.author }}
            </v-card-title>
            <v-card-subtitle>
                <date-format :date="q.created_at"></date-format>
            </v-card-subtitle>
            <v-card-text>
                {{ q.quote }}
            </v-card-text>
            <v-card-text class="pt-0">
                <v-chip v-for="tag in q.tags" :key="tag.name"
            label
            outlined
            color="green"
            class="mr-3 mt-2">
                {{ tag.name }}
            </v-chip>
            </v-card-text>
            <v-card-text class="pt-1">
                <v-btn :to="{ name: 'Quote', params: { id: q.id, page: page } }" plain color="green" outlined>
                    Открыть
                </v-btn>
            </v-card-text>
        </v-card>
        <v-pagination
              v-model="localPage"
              class="mt-16 mb-4"
              color="green"
              :length="maxPage"
              :total-visible="7"
            ></v-pagination>
    </v-container>
</template>

<script>
    //import { getQuotesOnPage } from '../api';
    import DateFormat from '../components/DateFormat';
    export default {
        name: 'Home',
        components:{
            DateFormat
        },
        data() {
            return {
                localPage: 1,
            }
        },
        computed: {
            quotes() {
                return this.$store.state.quotes;
            },
            page() {
                return this.$store.state.page;
            },
            maxPage() {
                return this.$store.state.maxPage;
            }
        },
        watch:{
            localPage(){
                this.$store.dispatch('updateQuotes', this.localPage);
            },
            page(){
                this.localPage = this.page;
                window.history.pushState(
                    null,
                    document.title,
                    `${window.location.pathname}?page=${this.page}`
                );
            }
        },
        mounted() {
            const windowData = Object.fromEntries(
                new URL(window.location).searchParams.entries()
            );
            let page = 1;
            if(windowData['page']) {
                page = parseInt(windowData['page']);
                if(page < 1 || isNaN(page)){
                    page = 1;
                }
            }
            this.$store.dispatch('updateQuotes', page);
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