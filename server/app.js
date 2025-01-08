const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
// const associationsRouter = require("./routes/associations");
// const municipalitiesRouter = require("./routes/municipalities");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
// app.use("/associations", associationsRouter); 
// app.use("/municipalities", municipalitiesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
