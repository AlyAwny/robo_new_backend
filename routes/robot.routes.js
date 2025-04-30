const express = require("express");
const router = express.Router();
 
// In-memory robot state
let robot_position = { x: 0, y: 0 };
let battery_voltage = 12.5;
let robot_speed = 0.6;
let robot_state = "Idle";
 
// GET robot status
router.get("/status", (req, res) => {
  console.log("Fetching robot status");
  res.json({
    position: robot_position,
    battery: battery_voltage,
    speed: robot_speed,
    state: robot_state,
  });
});
 
// POST command to robot
router.post("/command", (req, res) => {
  const { command, speed, position } = req.body;
  console.log("Received robot command:", req.body);
 
  if (command) robot_state = command;
  if (speed) robot_speed = speed;
  if (position) robot_position = position;
 
  res.json({ success: true, message: "Command received", state: robot_state });
});
 
module.exports = router;