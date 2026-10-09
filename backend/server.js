const jobRoutes = require("./routes/jobRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const Job = require("./models/job");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);

app.get("/", (req, res) => {
  res.json({ message: " Application Tracker is running" });
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log(" MySQL Database connection successfully");


    await sequelize.sync();

    console.log("database table synced successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });