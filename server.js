const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require('cors');
//Import Routes
const helloRoutes = require("./routes/helloRoutes");
const userRoutes = require("./routes/userRoutes");

// Express app
const app = express();

// OR, allow only specific origins
app.use(cors({
  origin: 'http://localhost:3000' // replace this with your React app's URL
}));

// Middleware
app.use(express.json())

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));


// Use routes
app.use("/api", helloRoutes);
app.use("/api/user", userRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
