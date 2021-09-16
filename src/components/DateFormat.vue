<template>
    <span>
        {{ getFormatDate(date) }}
    </span>
</template>

<script>
export default {
    name: 'DateFormat',
    data() {
        return {
            months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        }
    },
    props: {
        date: String
    },
    methods: {
        getFormatDate(stringDate){
            let date = null;
            if(stringDate){
                date = new Date(stringDate);
            }else{
                date = new Date();
            }
            return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
        }
    },
}
</script>