const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { inviteCodes } = require("../utils/inviteCodes");

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
  username: {
    type: String,
    required: false,
    unique: true,
  },
  installedWallpapers: {
    type: [String],
    default: [],
    required: false,
  },
  completedOnboarding: {
    type: Boolean,
    default: false,
    required: false,
  },
  preferences: {
    wallpaperCollection: {
      type: String,
      default: "default",
    },
    newsSources: {
      type: [String],
      default: [],
      required: false,
    },
    theme: {
      style: {
        type: String,
        default: "light",
      },
      color: {
        type: String,
        default: "pink",
      },
    },
    collapsedBookmarks: {
      type: Boolean,
      required: false,
      default: false,
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
    sidebarItemsOrder: {
      type: [String],
      default: [],
    },
    sidebarCategoryFoldersOrder: {
      type: [
        {
          categoryId: String,
          order: [String],
        },
      ],
      default: [],
    },
    favoritesBarItemsOrder: {
      type: [String],
    },
  },
  assistant: {
    type: {
      threadId: {
        type: String,
        required: false,
      },
      messagesCount: [
        {
          count: {
            type: Number,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
        },
      ],
    },
    required: false,
  },
});

// Static signup method
userSchema.statics.signup = async function (
  email,
  password,
  username,
  inviteCode
) {
  // Validation
  if (!email || !password || !inviteCode || !username) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const invitation = inviteCodes.filter(
    (invite) => email === invite.email.toLowerCase()
  )[0];

  if (!invitation) {
    throw Error("User not invited yet, apply for early access if you didn't");
  }

  if (inviteCode !== invitation.code.toLowerCase()) {
    throw Error(
      "The invitation code is incorrect. Contact support for any questions."
    );
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please use a stronger password");
  }

  const existsEmail = await this.findOne({ email });

  const existsUsername = await this.findOne({ username });

  if (existsEmail) {
    throw Error("Email already in use, please login");
  }

  if (existsUsername) {
    throw Error("Username in already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    username: username,
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
