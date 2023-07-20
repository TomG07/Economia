const { Schema, model } = require("mongoose");
const documentSave = new Schema({
  guildId: { type: String },
  config: {
    prefix: { type: String, default: "ny!" },
  },
  premium: {
    active: { type: Boolean, default: false },
    expired: { type: Number, default: 0 },
    userId: { type: String, default: null },
  }
});
module.exports = model("dataservers", documentSave);
