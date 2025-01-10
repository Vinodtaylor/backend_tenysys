const express = require('express');
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const dbURI='mongodb+srv://tensysdb:WoVpHaUgZd2nxHVD@tensys.ca1zl.mongodb.net/?retryWrites=true&w=majority&appName=tensys'

// const dbURI =   'mongodb://tensysdb:WoVpHaUgZd2nxHVD@tensys/?ssl=true&replicaSet=atlas-d3yeg0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=tensys';
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose
  .connect(dbURI)
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

app.use(express.json({ limit: "Infinity" }));

app.use(express.urlencoded({ limit: "Infinity", extended: true }));

app.use(cookieParser());

app.use(bodyparser.urlencoded({ extended: true }));

var publicDir = require("path").join(__dirname, "./uploads");



const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  origin: [
    'https://www.tensysinnovation.com',
    'https://www.tensysinnovation.com',
  ]
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(publicDir));

app.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      applicationName: "Tensys Backend Project",
      status: "Up",
      date: new Date(),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/test", (req, res) => {
  res.send("CI/CD test endpoint is Running Finally!");
});

app.use(require("./routes/app-routes"));

// For Comment

const server = http.createServer(app);
// socketApi.io.attach(server, { cors: corsOptions });

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });le.exports = { io };
// modu

server
  .listen(port, async () => {
    console.log(`listening to port ${port}`);
    // await socketconnection();
  })
  .on("error", (err) => {
    console.log(err);
    process.exit();
  });
