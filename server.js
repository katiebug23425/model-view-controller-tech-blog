// Importing required modules and dependencies
const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection");



// Creating express app and setting port

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));













// Syncing sequelize models with database and starting server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  });