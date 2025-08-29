const axios = require("axios");
const NodeCache = require("node-cache");
const User = require("../models/userModel");

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

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
    const cacheKey = topics.sort().join("_");

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Serving from cache:", cacheKey);
      return res.status(200).json({
        success: true,
        preferences: topics,
        articles: cachedData,
        cached: true,
      });
    }

    const query = topics.join(" OR ");
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`;

    console.log("Fetching from GNews API:", url);

    const response = await axios.get(url);

    // Save response in cache
    cache.set(cacheKey, response.data.articles);

    return res.status(200).json({
      success: true,
      preferences: topics,
      articles: response.data.articles,
      cached: false,
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
