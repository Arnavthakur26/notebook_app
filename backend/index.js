const connectToMongo = require("./db");
const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();
const mongoURI = process.env.MONGO_DB_URI;

connectToMongo(mongoURI);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "..", "frontend", "build")));
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
