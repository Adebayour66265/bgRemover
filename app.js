const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const Formidable = require("formidable");
const Rembg = require("rembg-node");
// const Rembg = require("sha");

require("dotenv").config();

const app = express();

//  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Routes
// app.get("/", (req, res) => {
//   res.render("home");
// });

app.get("/", (req, res) => {
  res.render("bgRemover");
});

app.post("/bgRemover", (req, res) => {
  let form = new Formidable.IncomingForm();

  form.parse(req, (err, fieds, files) => {
    if (err) {
      console.log("Error parse form", err);
      return res.status(500).send("500");
    }
    let inputFile = files.image;

    let outputPath = Date.now() + ".jpg";

    let command = `rembg i ${inputFile.path} ${outputPath}`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      res.download(outputPath, () => {
        fs.unlinkSync(outputPath);
      });
    });
  });
});

// Error middleware
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("App is Runing ");
  0;
});
