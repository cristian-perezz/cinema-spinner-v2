require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api/discover", async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const genre = req.query.genre || "";

  const url =
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc` +
    (genre ? `&with_genres=${genre}` : "");

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from TMDB" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
