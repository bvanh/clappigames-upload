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
        },
        (err, result) => {
          //   console.log(result);
          res.json(result);
          unlinkAsync(req.file.path);
        }
      );
    } catch (error) {
      console.log(error);
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
