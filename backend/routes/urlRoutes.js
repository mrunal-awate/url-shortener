// // routes/urlRoutes.js
// import express from "express";
// import shortid from "shortid";
// import Url from "../models/Url.js";

// const router = express.Router();

// // POST /api/shorten - Create short URL
// router.post("/shorten", async (req, res) => {
//   const { originalUrl } = req.body;

//   if (!originalUrl) return res.status(400).json({ error: "Original URL required" });

//   try {
//     let shortCode = shortid.generate();
//     const newUrl = new Url({ originalUrl, shortCode });
//     await newUrl.save();

//     res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // GET /:shortcode - Redirect to original URL
// router.get("/:shortcode", async (req, res) => {
//   try {
//     const url = await Url.findOne({ shortCode: req.params.shortcode });
//     if (url) {
//       return res.redirect(url.originalUrl);
//     } else {
//       return res.status(404).json({ error: "No URL found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// export default router;

// routes/urlRoutes.js
import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

/**
 * POST /api/shorten - Create short URL
 */
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL required" });
  }

  try {
    const shortCode = shortid.generate();

    const newUrl = new Url({
      originalUrl,
      shortCode,
      visits: 0,
    });

    await newUrl.save();

    // Use BASE_URL if available, else fall back to request host
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    res.json({
      shortUrl: `${baseUrl}/${shortCode}`,
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/urls - List all shortened URLs
 */
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
