import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./server.js";

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5003;
const URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
} catch (error) {
  console.log("Error while connecting to the database: ", error);
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
