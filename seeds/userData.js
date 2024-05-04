const { User } = require("../models");
const userData = [
    {
      username: "wackywednesday",
      email: "wackywednesday@example.com",
      password: "password1",
    },
    {
      username: "techdude",
      email: "techdude@example.com",
      password: "password2",
    },
    {
      username: "pepperonipizza",
      email: "pizzapizza@example.com",
      password: "password3",
    },
    {
      username: "spencergus",
      email: "theblueberry@example.com",
      password: "password4",
    },
    {
      username: "devgirl5",
      email: "delanadev@example.com",
      password: "password5",
    },
  
  ];

  const seedUsers = () => User.bulkCreate(userData);
  module.exports = seedUsers;