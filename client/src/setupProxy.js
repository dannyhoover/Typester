const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/api/**", { target: "https://localhost:5000" }));
  app.use(proxy("/otherApi/**", { target: "https://localhost:5000" }));
};