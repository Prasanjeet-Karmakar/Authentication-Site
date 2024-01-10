const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
  username: String,
  passwords: [
    {
      website: String,
      password: String,
    },
  ],
});

module.exports = mongoose.model("PasswordStorage", passwordSchema);
