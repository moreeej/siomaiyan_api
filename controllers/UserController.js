const UserModel = require('../models/User');

async function getUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
}

module.exports = {
  getUsers,
};
