import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import appointmentsRoutes from "./routes/appointments.routes.js";
import { cronReset } from "./Automate/resetTime.js";
import sendInfoRoutes from "./routes/sendInfo.routes.js";
import sendRoutes from "./routes/send.routes.js";
import testRoutes from "./routes/TEST.routes.js";
import updateUser from "./routes/user.routes.js"

const app = express();

cronReset();

app.use('/index.html', (req, res)=>{
    res.sendFile('index.html', {root: './public'})
})
//test


app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", authRoutes);
app.use("/api", appointmentsRoutes);
app.use("/api", sendInfoRoutes);
app.use("/api", updateUser);
app.use("/test", testRoutes);
app.use(sendRoutes);



export default app;
