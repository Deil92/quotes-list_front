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
              v-model="page"
              class="mt-16 mb-4"
              color="green"
              :length="maxPage"
              :total-visible="7"
            ></v-pagination>
    </v-container>
</template>

<script>
    import { getQuotesOnPage } from '../api';
    import DateFormat from '../components/DateFormat';
    export default {
        name: 'Home',
        components:{
            DateFormat
        },
        data() {
            return {
                quotes: [],
                page: null,
                maxPage: null,
            }
        },
        watch:{
            page(){
                this.quotes = [];
                window.history.pushState(
                    null,
                    document.title,
                    `${window.location.pathname}?page=${this.page}`
                );
                getQuotesOnPage(this.page).then((result) => {
                    const jsonRes = result.data;
                    this.quotes = jsonRes.quotes;
                    this.maxPage = jsonRes.maxpage;
                    if(this.page > this.maxPage){
                        this.page = this.maxPage;
                    }
                });
            }
        },
        mounted() {
            const windowData = Object.fromEntries(
                new URL(window.location).searchParams.entries()
            );
            this.page = windowData['page'] ? parseInt(windowData['page']) : 1;
            if(windowData['page']) {
                let page = parseInt(windowData['page']);
                if(page < 1 || isNaN(page)){
                    this.page = 1;
                }else{
                    this.page = page;
                }
            }
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