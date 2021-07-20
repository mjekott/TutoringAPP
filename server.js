const express = require("express");
const connectDb = require("./db");
require("dotenv").config();
const { PORT } = process.env;

// Connect DB
connectDb();

// Initialize app
const app = express();

// Initialize Express middleware
app.use(express.json({ extended: false }));

// Create a basic express route
app.get("/", (req, res) => res.json("messsage:'Welcome to Tutuoring App'"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`app running on ${port}`));
