import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { userRoutes } from "./module/user/user.route";
import { issuesRouter } from "./module/issues/issue.route";
import { authRouter } from "./module/auth/auth.route";
import CookieParser from "Cookie-Parser"
const app = express();

app.use(CookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use("/api",userRoutes)
app.use("/api/auth",authRouter)
app.use("/api/issues",issuesRouter)

app.get("/", (req, res) => {
    res.send("Hello DevPulse API!");
});


export default app;