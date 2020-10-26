const mongoose = require("mongoose");

const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: false, }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);