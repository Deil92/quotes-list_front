import Vue from 'vue'
import Vuex from 'vuex'
import {
    getQuotesOnPage
} from '../api';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        quotes: [],
        page: 1,
        maxPage: null
    },
    mutations: {
        updateQuotes(state, quotes) {
            state.quotes = quotes;
        },
        updatePage(state, page){
            state.page = page;
        },
        updateMaxPage(state, maxPage){
            state.maxPage = maxPage;
        }
    },
    actions: {
        updateQuotes(context, page) {
            getQuotesOnPage(page).then((result) => {
                const jsonRes = result.data;
                context.commit('updateQuotes', jsonRes.quotes);
                context.commit('updateMaxPage', jsonRes.maxpage);
                const maxPage = jsonRes.maxpage;
                if(page > maxPage){
                    context.commit('updatePage', maxPage);
                }else if(page < 1){
                    context.commit('updatePage', 1);
                }else{
                    context.commit('updatePage', page);
                }
            });
        }
    },
    modules: {}
})