import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();

//midd
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => res.send("Api working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default app;
