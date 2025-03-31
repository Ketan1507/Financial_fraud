const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/user");
const trangaction = require("./routes/transaction");
const aiModel = require("./routes/aiModel");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/trangaction", trangaction);

app.use("/api/predict", aiModel);
app.use("/api/train", aiModel);
app.use("/api/status", aiModel);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
