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

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/urls - List all shortened URLs (Admin Page)
 * ✅ Must be ABOVE the shortcode redirect route
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


router.get("/:shortcode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });

    if (url) {
      url.visits = (url.visits || 0) + 1;
      await url.save();

      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "No URL found" });
    }
  } catch (err) {
    console.error("Error redirecting short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
