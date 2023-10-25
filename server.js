const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//Import Routes
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const folderRoutes = require("./routes/folderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const wallpapersRoutes = require("./routes/wallpapersRoutes");

// Express app
const app = express();

const allowedOriginas = [
  "http://localhost:3000",
  "chrome-extension://pkbdodflcdblhhhhfpnibfaibbgnhgpb",
  "https://mytab-frontend.onrender.com",
];

// OR, allow only specific origins
app.use(
  cors({
    origin: allowedOriginas, // replace this with your React app's URL
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Middleware
app.use(express.json());

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/wallpapers", wallpapersRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
