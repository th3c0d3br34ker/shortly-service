const express = require("express");
const validUrl = require("valid-url");
const shortId = require("shortid");

const URL = require("../models/url");

// @route    POST /api/generate
// @desc     Generate a short URL.
const router = express.Router();

router.post("/generate", async (req, res) => {
  const { long_url } = req.body;
  const baseURL = process.env.BASE_URL;

  if (!validUrl.isUri(baseURL))
    return res.status(401).send("Invalid Base URL!");

  if (!validUrl.isUri(long_url)) return res.status(403).send("Invalid URL!");

  try {
    let url = await URL.findOne({ long_url });

    if (url) return res.status(302).json(url);

    // Create Code
    const urlCode = shortId.generate();
    const shortURL = baseURL + urlCode;

    url = new URL({
      long_url,
      short_url: shortURL,
      url_code: urlCode,
      date: new Date(),
    });

    await url.save();

    res.status(201).json(url);
  } catch (error) {
    console.log("¯¯__(ツ)__/¯¯");
    console.log(error);
    res.status(500).send("¯¯__(ツ)__/¯¯");
  }
});

module.exports = router;
