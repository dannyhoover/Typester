import axios from "axios";

const API = {
  Excerpt: {
    getAll() {
      return axios.get("/api/excerpts");
    },
  },
  Stats: {
    getAll() {
      return axios.get("/api/stats");
    },
    saveStats(stats) {
      return axios.post("/api/stats", stats);
    },
  },
};

export default API;
