const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/", require("./routes/url"));

app.get("/", (_, res) => {
  return res.send("¯¯__(ツ)__/¯¯");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
