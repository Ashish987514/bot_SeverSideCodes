const express = require("express");
const router = express.Router();
const SerialNumber = require("../models/SerialNumber");

// Function to generate a random serial number
function generateSerialNumber() {
  return (
    Math.random().toString(36).substring(2, 10).toUpperCase() +
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );
}

// @route POST /generate_serial
// @desc Generate and store serial number
router.post("/generate_serial", async (req, res) => {
  try {
    const serialNumber = generateSerialNumber();

    const newSerial = new SerialNumber({ serial_number: serialNumber });
    await newSerial.save();

    res.json({ serial_number: serialNumber });
  } catch (err) {
    console.error(err.message); // Log the error message to the terminal
    res.status(500).send("Server Error"); // Send a user-friendly message to the client
  }
  
});

module.exports = router;