const { User } = require('../models');

const userData =
  [
    {
      "name": "Hermione Granger",
      "email": "hgranger@gmail.com",
      "password": "admin12345",
      "role": "manager"
    },
    {
      "name": "admin",
      "email": "admin@gmail.com",
      "password": "123456789",
      "role": "manager"
    },
    {
      "name": "Harry Potter",
      "email": "hpotter@hotmail.com",
      "password": "password12345",
      "role": "employee"
    },
    {
      "name": "Ron Weasley",
      "email": "rweasley@yahoo.com",
      "password": "1234pass",
      "role": "employee"
    }
  ]

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;