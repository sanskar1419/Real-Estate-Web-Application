import express from "express";
import userRouter from "./routes/user.routes.js";

const app = new express();

app.use("/api/user", userRouter);

export default app;
