import axios from "axios";

const API = {
    Book: {
        search(query) {
            return axios.get(
                "https://www.googleapis.com/books/v1/volumes?q=" + query
            );
        },
        getAll() {
        },
        create(book) {
        },
        delete(bookId) {
        },
    },
};

export default API;
