const express = require("express");
const checkUrl = require("../util/checkUrl");
const shortId = require("shortid");

const URL = require("../models/url");

// @route    POST /api/generate
// @desc     Generate a short URL.

// @route    POST /api/delete/:code
// @desc     Delete an short URL.

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { long_url, base_url } = req.body;
  const baseURL = base_url || process.env.BASE_URL;

  if (checkUrl(baseURL)) return res.status(401).send("Invalid Base URL!");

  // Check for validation
  if (checkUrl(long_url)) return res.status(403).send("Invalid URL!");

  try {
    let url = await URL.findOne({ long_url });

    if (url) {
      url.message = "URL already created!";
      return res.status(302).json(url);
    }

    // Create Code
    const urlCode = shortId.generate();
    const shortURL = baseURL + urlCode;

    url = new URL({
      url_code: urlCode,
      long_url,
      base_url: baseURL,
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

router.post("/delete/:code", async (req, res) => {
  const urlCode = req.params.code;

  let url = await URL.findOne({ url_code: urlCode });

  if (url) {
    await url.remove();
    return res.send(url);
  }

  return res.status(404).send("Not found! ¯¯__(ツ)__/¯¯");
});

module.exports = router;
