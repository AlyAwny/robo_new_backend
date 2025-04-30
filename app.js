const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const robotRoutes = require("./routes/robot.routes");
 
const app = express();
 
// CORS

/*app.use(
  cors({
    origin: "https://robot-front.vercel.app",
    credentials: true,
  })
);*/
app.use((req, res, next) => {
  const allowedOrigins = ["https://robot-front.vercel.app"];
  const origin = req.headers.origin;
 
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
 
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
 
  next();
});
 
// app.use(
//   cors({
//     origin: "https://prometica.vercel.app",
//     // origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );
 
app.options("*", cors());

 
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
 
app.get("/protected", (req, res) => {
  
  const user = req.auth.user;
  res.json({ message: `Welcome ${user}, you are authorized.` });
});
 
app.get("/error_test", (req, res) => {
  res.status(500).json({ detail: "Test error route triggered" });
});
 
module.exports = app;