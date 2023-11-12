const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

//Import Routes
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const folderRoutes = require("./routes/folderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const wallpapersRoutes = require("./routes/wallpapersRoutes");
const appRequestRoutes = require("./routes/appRequestsRoutes");

//Import Widget Routes
const widgetQuotesRoutes = require("./routes/widgets/widgetQuotesRoutes");
const widgetPopularRoutes = require("./routes/widgets/widgetPopularRoutes");
const widgetWeatherRoutes = require("./routes/widgets/widgetWeatherRoutes");
const widgetCryptoRoutes = require("./routes/widgets/widgetCryptoRoutes");

// Express app
const app = express();

// Use Helmet
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

const allowedOrigins = [
  "http://localhost:3000",
  "chrome-extension://pkbdodflcdblhhhhfpnibfaibbgnhgpb",
  "https://mytab-frontend.onrender.com",
];

// OR, allow only specific origins
app.use(
  cors({
    origin: allowedOrigins,
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
app.use("/api/apprequests", appRequestRoutes);

// Use Widget Routes
app.use("/api/widgetquotes", widgetQuotesRoutes);
app.use("/api/widgetPopular", widgetPopularRoutes);
app.use("/api/widgetWeather", widgetWeatherRoutes);
app.use("/api/widgetCrypto", widgetCryptoRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
