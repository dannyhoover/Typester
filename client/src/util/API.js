import axios from "axios";

const API = {
  Excerpt: {
    getAll() {
      return axios.get("/api/excerpts");
    },
    create(book) {},
    delete(bookId) {},
  },
};

export default API;
