import axios from 'axios'
const ax = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const getTags = () => {
    return ax.get('tags');
};

export const getQuoteById = (id) => {
    return ax.get('quote/' + id);
};

export const getQuotesOnPage = (page) => {
    return ax.get('quotes/' + page);
};

export const createQuote = (data) => {
    return ax.post('/quote', data);
};