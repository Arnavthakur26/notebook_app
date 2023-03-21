const connectToMongo = require("./db");
const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();

const mongoURI =
  "mongodb+srv://tarnav206:n9sFh5FfmYvggFOc@cluster0.mqv6mko.mongodb.net/?retryWrites=true&w=majority";
connectToMongo(mongoURI);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
