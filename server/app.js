// servidor/app.js

const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/users", userRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/register.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});
