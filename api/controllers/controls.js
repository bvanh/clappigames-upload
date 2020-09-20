"use strict";
const listErr = require("../ultils/errorStatus");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "vietahn40",
  api_key: "756115152418124",
  api_secret: "eAZ1WnfacYmEWknHkMB9iwVDqKU",
});
const { CLIENT_ERROR, CLOUDINARY_ERROR, SERVER_ERROR } = listErr;
module.exports = {
  upload: async (req, res) => {
    try {
      const { path, originName } = req.file;
      cloudinary.uploader.upload(
        path,
        {
          format: "jpg",
          folder: "clappigames",
        },
        (err, result) => {
          res.json(result);
          unlinkAsync(req.file.path);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  delete: (req, res) => {
    try {
      const { img_id } = req.body;
      cloudinary.uploader.destroy(img_id, (error, result) => {
        switch (result.result) {
          case "ok":
            res.json(result);
            break;
          case "not found":
            res.status(CLOUDINARY_ERROR).send({ message: "image not found" });
            break;
          default:
            res.status(CLOUDINARY_ERROR).send({ message: "cloud_error" });
            break;
        } 
      });
    } catch (err) {
      res.status(SERVER_ERROR).send({ message: "server_error" });
    }
  },
};
