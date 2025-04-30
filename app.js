const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const robotRoutes = require("./routes/robot.routes");
 
const app = express();
 
// CORS
app.use(
  cors({
    origin: "https://robot-web-gui-git-master-aly-awnys-projects.vercel.app",
    credentials: true,
  })
);
 
 app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Robot server is deployed and running!",
    timestamp: new Date().toISOString(),
  });
});
// Auth middleware
app.use(
  basicAuth({
    users: { admin: "alyhanykhaledhatem" },
    unauthorizedResponse: () => "Invalid credentials",
  })
);
 
// Middleware
app.use(express.json());
 
// Routes
app.use("/api/robot", robotRoutes);
 
//app.get("/protected", (req, res) => {
  app.get((req, res) => {
  const user = req.auth.user;
  res.json({ message: `Welcome ${user}, you are authorized.` });
});
 
app.get("/error_test", (req, res) => {
  res.status(500).json({ detail: "Test error route triggered" });
});
 
module.exports = app;