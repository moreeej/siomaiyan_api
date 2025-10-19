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

async function checkCreds(){
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json("Log in Successful");
  } catch (err) {
    console.error("Error checking credentials:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getUsers,
  checkCreds,
};
