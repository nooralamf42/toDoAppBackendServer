import Express from "express";
import "dotenv/config"
import { authRouter } from "./routes/authRoute.js";
import { taskRoute } from "./routes/taskRoute.js";
import multer from "multer";

const upload = multer()

const app = Express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow specific headers
    next();
  });
app.use(upload.none())
app.use(Express.json())
app.use(Express.urlencoded({extended: false}))
app.use("/auth", authRouter)
app.use("/task", taskRoute)



app.listen(process.env.PORT, ()=> console.log(`Server is running at port ${process.env.PORT}`))