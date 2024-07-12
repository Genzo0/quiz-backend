require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOption");
port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/quizzes", require("./routes/quizRoutes.js"));
app.use("/users", require("./routes/userRoutes.js"));
app.use("/questions", require("./routes/questionRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
