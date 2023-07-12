const { Schema, model } = require("mongoose");
const documentSave = new Schema({
     guildId: { type: String },                         
     config: {
       prefix: { type: String, default: "ny!" },
     },
});
module.exports = model("dataservers", documentSave);
