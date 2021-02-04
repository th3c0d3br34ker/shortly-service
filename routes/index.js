const express = require("express");
const URL = require("../models/url");

// @route    GET /:code
// @desc     ReDIRECT to correct URL.
const router = express.Router();

router.get("/:code", async (req, res) => {
  const urlCode = req.params.code;

  try {
    const url = await URL.findOne({ url_code: urlCode });

    if (url) return res.redirect(url.long_url);

    return res.status(404).send("Not found! ¯¯__(ツ)__/¯¯");
  } catch (error) {
    console.log("¯¯__(ツ)__/¯¯");
    console.log(error);
    res.status(500).send("¯¯__(ツ)__/¯¯");
  }
});

module.exports = router;
