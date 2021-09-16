<template>
    <v-container>
        <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="600">
            <v-card-title class="justify-center">
                Упс, страница не найдена
            </v-card-title>
            <v-card-text class="d-flex justify-center">
                <v-btn to="/" plain color="green" outlined>
                    Вернуться
                </v-btn>
            </v-card-text>
        </v-card>
        <v-img alt="404" src="../assets/404.png"></v-img>
    </v-container>
</template>

<script>
    export default {
        name: 'PageNotFound',
    }
</script>

<style>
</style>