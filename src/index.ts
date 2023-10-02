import express from "express";
// import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import postRouter from "./routes/postsRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(config.mongo.url)
  .then(() => console.log("Database connection successful!!!"))
  .catch((err) => console.log(err));

// Body parser
app.use(express.json());
// app.use(cors());

// Rules of our API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeste-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

    return res.status(200).json({});
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Welcome!!! 🙂");
});

app.use("/api", postRouter);

app.listen(PORT, () =>
  console.log(`The server is connected to port: ${PORT} ☕☕`)
);

export default app;
