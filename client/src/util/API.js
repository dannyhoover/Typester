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
  User: {
    register(userDetails) {
      return axios.post("/api/user/register", userDetails);
    },
    login(userDetails) {
      return axios.post("/api/user/login", userDetails);
    }
  }
};

export default API;
