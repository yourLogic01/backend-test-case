import express from "express";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes";
import bookRoutes from "./routes/bookRoutes";
import borrowingRoutes from "./routes/borrowingRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setupSwagger(app);

app.use("/members", memberRoutes);
app.use("/books", bookRoutes);
app.use("/borrowing", borrowingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
