const express = require("express");
const router = express.Router();
const Guest = require("../models/Guest");

// Create guest
router.post("/", async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all guests
router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance
router.post("/mark/:code", async (req, res) => {
    try {
        const guest = await Guest.findOne({ code: req.params.code });

        if (!guest) return res.json({ message: "Guest not found" });

        if (guest.attended)
            return res.json({ message: "Already Checked In" });

        guest.attended = true;
        await guest.save();

        return res.json({ message: "Guest Checked In Successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
module.exports = router;
