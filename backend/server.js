const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ecom:amanladla@cluster0.en3tt.mongodb.net/smart-agri")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
