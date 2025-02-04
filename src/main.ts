// This file contains boilerplate code for setting up an Express app. You don't need to understand all of the details,
// but you should understand that we're setting up an Express app that will use our router (containing routes for all
// of our concepts) and a session so we can store cookies.

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import logger from "morgan";
import * as path from "path";

// The following line sets up the environment variables before everything else.
dotenv.config();

// Import our router, which contains the routes for all of our concepts.
import router from "./routes";

export const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger("dev"));

app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.use(express.json()); // Enable parsing JSON in requests and responses.
app.use(express.urlencoded({ extended: false })); // Also enable URL encoded request and responses.

// Session allows us to store a cookie 🍪.
app.use(
  session({
    secret: process.env.SECRET || "Hello 6.1040",
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", router);

// For all unrecognized requests, return a not found message.
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});