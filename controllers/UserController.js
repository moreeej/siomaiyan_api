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

async function checkCreds(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username:username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    
    res.json({
      success: true,
      message: "Log in Successful",
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error("Error checking credentials:", err);
    res.status(500).json({ error: "Server error" });
  }
}



module.exports = {
  getUsers,
  checkCreds,
};
