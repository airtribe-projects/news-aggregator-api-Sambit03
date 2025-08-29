const axios = require("axios");
const User = require("../models/userModel");

const getNews = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.preferences || !user.preferences.topics.length) {
      return res.status(400).json({ error: "No preferences found for user" });
    }
    const topics = user.preferences.topics;
    const query = topics.join(" OR ");

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`; //gnews api end point

    console.log("GNews API URL:", url);

    const response = await axios.get(url);

    return res.status(200).json({
      success: true,
      preferences: topics,
      articles: response.data.articles,
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.message || "Failed to fetch news from GNews",
      });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNews };
