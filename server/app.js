const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
// const associationsRouter = require("./routes/associations");
const municipalitiesRouter = require("./routes/municipalities");

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://lupinkampen.vercel.app', 'https://lupin-server.vercel.app/'],
  methods: 'GET,POST,UPDATE,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
// app.use("/associations", associationsRouter); 
app.use("/api/municipalities", municipalitiesRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
