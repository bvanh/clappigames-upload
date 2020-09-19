"use strict";
const uploadMulter = require("../models/multer");
const api = require("../controllers/controls");
module.exports = function (app) {
  // todoList Routes
  app.route("/upload").post(uploadMulter.single("img"), api.upload);
  app.route("/delete").post(api.delete);
};
