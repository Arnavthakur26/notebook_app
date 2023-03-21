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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
