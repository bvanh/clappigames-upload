let express = require("express");
let cors = require("cors");
let bodyparser = require("body-parser");
let fileUpload = require("express-fileupload");
let port = process.env.PORT || 3002;
const app = express();
app.use(cors());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let routes = require("./api/routes/routers"); //importing route
routes(app);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
app.listen(port);

console.log("RESTful API server started on: " + port);
