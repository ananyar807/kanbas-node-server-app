import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import "dotenv/config";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.NETLIFY_URL
        : process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "my secret key",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: "https://kanbas-node-server-app-dsa7.onrender.com",
  };
}
app.use(session(sessionOptions));

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);

// another project uses 4000 so I used 4001
app.listen(process.env.PORT || 4001);
