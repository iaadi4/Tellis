import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

const url = process.env.DATABASE_URL!;
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    await client.db("tellis").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (e) {
    console.error("❌ Failed to connect:", e);
  } finally {
    await client.close();
  }
}
run();


app.listen(PORT, () => {
    console.log("Server started at PORT: ", PORT);
})