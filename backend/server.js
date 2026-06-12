const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const consultationRoutes =
  require("./routes/consultationRoutes");

const connectDB = require("./config/db");
const dashboardRoutes =
require("./routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use(
  "/api/consultations",
  consultationRoutes
);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Astrologer CRM API Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});