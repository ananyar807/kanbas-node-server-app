import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);

// another project uses 4000 so I used 4001
app.listen(process.env.PORT || 4001);
