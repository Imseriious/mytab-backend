const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    wallpaperCollection: {
      type: String,
      default: "all",
    },
    cryptoWidget: {
      type: [String],
      default: ["BTC", "ETH"],
    },
    weatherWidget: {
      city: {
        type: String,
        default: "New york",
      },
    },
  },
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Ups, incorrect credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Ups, incorrect credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
