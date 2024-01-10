const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./Routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
