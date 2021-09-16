<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn plain color="green" outlined v-bind="attrs" v-on="on">
                Добавить
            </v-btn>
        </template>

        <v-card class="rounded-lg">
            <v-form v-model="valid">
                <v-card-title class="text-h5 lighten-2 justify-center">
                    Добавить цитату
                </v-card-title>

                <v-divider></v-divider>
                <template if="error">
                    <v-card-text class="text-center pt-2">
                    {{ error }}
                    </v-card-text>
                </template>
                
                <v-card-text>
                    <v-text-field
                        v-model="author"
                        :rules="authorRules"
                        :counter="20"
                        label="Имя"
                        required
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="pt-4">
                    <v-textarea
                        class="quote-area"
                        outlined
                        v-model="quote"
                        :rules="quoteRules"
                        :counter="5000"
                        label="Цитата"
                        no-resize
                        required
                    ></v-textarea>
                </v-card-text>

                <v-card-text>
                    <multiselect 
                        v-model="value"
                        :options="options"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :max="3"
                        placeholder="Выберите тэги"
                        label="name"
                        track-by="name"
                        selectLabel="Выбрать"
                        selectGroupLabel="Выбрать"
                        selectedLabel="Уже выбран"
                        deselectLabel="Удалить"
                        deselectGroupLabel="Удалить"
                        >
                        <template slot="maxElements">
                            Максимум 3 тэга
                        </template>
                        <template slot="noResult">
                            Тэг не найден
                        </template>
                    </multiselect>
                    <p v-if="validTag">
                        {{ validTag }}
                    </p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.prevent="createQuote">
                        Добавить
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import {
        getTags, 
        createQuote
    } from '../api';

    export default {
        components: {
            Multiselect
        },
        data() {
            return {
                dialog: false,
                error: null,
                validTag: null,
                valid: false,
                value: [],
                options: [],
                author: '',
                authorRules: [
                    v => !!v.trim() || 'Введите имя',
                    v => v.length <= 20 || 'Имя должно быть не больше 20 символов'
                ],
                quote: '',
                quoteRules: [
                    v => !!v.trim() || 'Введите цитату',
                    v => v.length >= 10 || 'Цитата должна быть больше 10 символов',
                    v => v.length <= 5000 || 'Цитата должна быть меньше 5000 символов'
                ]
            }
        },
        methods: {
            createQuote() {
                if(this.value.length < 1){
                    this.validTag = 'Нужен хотя бы один тэг';
                    return;
                }
                if(this.value.length > 3){
                    this.validTag = 'Тэгов не может быть больше 3';
                    return;
                }
                if(this.valid){
                    createQuote({
                        author: this.author,
                        quote: this.quote,
                        tags: this.value.map(elem => elem.id),
                    }).then((result) => {
                        if(result.data){
                            this.author = '';
                            this.quote = '';
                            this.value = [];
                            this.dialog = false;
                            this.$router.go()
                        }
                    }).catch((err) => {
                        if(err.response.status == 400){
                            this.error = "Заполните поля";
                            return;
                        }
                        this.error = "Упс, похоже произошла ошибка";
                    })
                }
            },
        },
        mounted() {
            getTags().then(result => {
                this.options = result.data;
            }).catch(() => {
                this.error = "Упс, похоже произошла ошибка";
            })
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .v-dialog.v-dialog--active {
        overflow-y: inherit;
    }

    .v-application ul,
    .v-application ol {
        padding-left: 0px !important;
    }
</style>