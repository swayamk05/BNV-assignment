const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Blog API running" });
});

app.use("/api/blogs", blogRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
