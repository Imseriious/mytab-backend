const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const { updateDatabaseNews } = require("./timeline/utils");
const News = require("./models/newsModel");

//Import Routes
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const folderRoutes = require("./routes/folderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const wallpapersRoutes = require("./routes/wallpapersRoutes");
const ticketsRoutes = require("./routes/ticketsRouters");
const assistantRoutes = require("./routes/assistantRoutes");
const profileRoutes = require("./routes/profileRoutes");
const newsRouter = require("./routes/newsRoutes");
const speakUpRoutes = require("./routes/speakUpRoutes");
const feedRoutes = require("./routes/feedRoutes");

//Import Widget Routes
const widgetQuotesRoutes = require("./routes/widgets/widgetQuotesRoutes");
const widgetWeatherRoutes = require("./routes/widgets/widgetWeatherRoutes");
const widgetCryptoRoutes = require("./routes/widgets/widgetCryptoRoutes");
const spotifyRoutes = require("./routes/widgets/spotifyRoutes");

// Express app
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "chrome-extension://pkbdodflcdblhhhhfpnibfaibbgnhgpb",
  "https://sleektab.app",
  "https://www.sleektab.app",
];

// OR, allow only specific origins
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Use Helmet
app.use(helmet());

app.set("trust proxy", 1);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200, // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

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
app.use("/user", userRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/folders", folderRoutes);
app.use("/categories", categoryRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/wallpapers", wallpapersRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/assistant", assistantRoutes);
app.use("/profile", profileRoutes);
app.use("/news", newsRouter);
app.use("/speakup/", speakUpRoutes);
app.use("/feed/", feedRoutes);

// Use Widget Routes
app.use("/widgetquotes", widgetQuotesRoutes);
app.use("/widgetWeather", widgetWeatherRoutes);
app.use("/widgetCrypto", widgetCryptoRoutes);
app.use("/spotify", spotifyRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

cron.schedule("0 1 * * *", async () => {
  try {
    console.log("Scheduled update of news...");
    await updateDatabaseNews();
  } catch (error) {
    console.error("Error during scheduled news update:", error);
  }
});

const checkAndUpdateNewsOnStartup = async () => {
  let newsData = await News.findOne();

  if (
    !newsData ||
    newsData.newsDate.toDateString() !== new Date().toDateString()
  ) {
    console.log("Updating news on server startup...");
    await updateDatabaseNews();
  } else {
    console.log("News are recent, won't update")
  }
};

// Call this function when your server starts
checkAndUpdateNewsOnStartup();
