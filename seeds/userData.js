const { User } = require("../models");
const userData = [
    {
      id: 1,
      username: "wackywednesday",
      email: "wackywednesday@example.com",
      password: "password1",
    },
    { id: 2,
      username: "techdude",
      email: "techdude@example.com",
      password: "password2",
    },
    { id: 3,
      username: "pepperonipizza",
      email: "pizzapizza@example.com",
      password: "password3",
    },
    { id: 4,
      username: "spencergus",
      email: "theblueberry@example.com",
      password: "password4",
    },
    { id: 5,
      username: "devgirl5",
      email: "delanadev@example.com",
      password: "password5",
    },
  
  ];

  const seedUsers = () => User.bulkCreate(userData);
  module.exports = seedUsers;