import express from "express";
import componentsRoute from "./routes/components";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/", componentsRoute);

app.listen(PORT, () => {
  console.log(`🚀 MCP Server running at http://localhost:${PORT}`);
});
