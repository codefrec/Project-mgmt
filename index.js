const express = require("express");
const app = express();
const winston = require("winston");
const PORT = process.env.PORT || 5000;

require("./start/config")();
require("./start/logging")();
require("./start/db")();
require("./start/routes")(app);

app.listen(PORT, () => {
  winston.info(`Server listening on port ${PORT}`);
});
