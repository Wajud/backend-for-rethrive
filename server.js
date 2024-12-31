const express = require("express");
const { registerUser, loginUser } = require("./controllers/usersController");
const connectTodb = require("./connectDB");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

//cors
app.use(cors());

//middleware
app.use(express.json());

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

connectTodb(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is live");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to database :", err);
  });
