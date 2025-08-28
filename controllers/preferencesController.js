const User = require("../models/userModel");

const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("preferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categories, languages } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "preferences.categories": categories,
          "preferences.languages": languages,
        },
      },
      { new: true, runValidators: true }
    ).select("preferences");

    res.json(updatedUser.preferences);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getPreferences, updatePreferences };
