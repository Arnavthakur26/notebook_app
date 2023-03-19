const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
