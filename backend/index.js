import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./src/routes/payment.routes.js";
import { loadAllStrategies } from "./src/strategies/loadStrategies.js";
loadAllStrategies(); 
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "payments-api" });
});

app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend escuchando en http://localhost:${PORT}`)
);
