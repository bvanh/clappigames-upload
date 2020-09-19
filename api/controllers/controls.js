"use strict";
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "vietahn40",
  api_key: "756115152418124",
  api_secret: "eAZ1WnfacYmEWknHkMB9iwVDqKU",
});
module.exports = {
  upload: async (req, res) => {
    try {
      const { path, originName } = req.file;
      cloudinary.uploader.upload(
        path,
        {
          public_id: originName,
          format: "jpg",
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
      cloudinary.uploader(img_id, (error, result) => {
        res.json(result || error);
      });
    } catch (err) {
      res.json(err);
    }
  },
};
// cloudinary.config({
//     cloud_name: "vietahn40",
//     api_key: "756115152418124",
//     api_secret: "eAZ1WnfacYmEWknHkMB9iwVDqKU",
//   });
//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "clappigames",
//       // format: async (req, file) => "png", // supports promises as well
//       public_id: (req, file) => {
//         orgName = file.originalname.trim().replace(/ /g, "-")
//         console.log(orgName)
//         return file.originalname
//       },
//     },
//   });
