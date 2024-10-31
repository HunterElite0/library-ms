const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const id = await User.create(req.body);
    id
      ? res.json({ id })
      : res.status(500).json({ error: "Failed to create user" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  const affectedRows = await User.update(req.params.id, req.body);
  affectedRows
    ? res.json({ affectedRows })
    : res.status(500).json({ error: "Failed to update user" });
};

exports.deleteUser = async (req, res) => {
  const affectedRows = await User.delete(req.params.id);
  affectedRows
    ? res.json({ affectedRows })
    : res.status(500).json({ error: "Failed to delete user" });
};
