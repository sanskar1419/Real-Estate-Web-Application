import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = new express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

export default app;
