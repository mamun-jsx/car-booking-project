import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/DB.js";
import router from "./router/router.js";

const PORT = process.env.PORT || 3000;
// initial express app
const app = express();
// middle wear
app.use(cors());
app.use(express.json());
await connectDB(); // DataBase connection Called
app.use("/", router); // Router

// test apis
app.get("/", async (req, res) => {
  res.send("Server is running");
  console.log("app is running");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
