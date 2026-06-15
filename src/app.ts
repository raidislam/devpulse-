import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { userRoutes } from "./module/user/user.route";
import { issuesRouter } from "./module/issues/issue.route";
import { authRouter } from "./module/auth/auth.route";
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth",authRouter)
app.use("/api",issuesRouter)

app.get("/", (req, res) => {
    res.send("Hello DevPulse API!");
});


export default app;