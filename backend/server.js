import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import ENV from "./src/config/ENV.js";
import connectDB from "./src/config/db.js";

const PORT = ENV.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`app is running`)
})