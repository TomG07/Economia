const { Schema, model } = require("mongoose");
const documentSave = new Schema({
    _id: { type: String },
    g: {
        status: { type: Boolean, default: false },
        sendDate: { type: Number, default: 0 },
        partner: { type: Boolean, default: false },
        approvedBy: { type: String, default: null },
        approvedDate: { type: Number, default: 0 },
        blacklist: { type: Boolean, default: false }
    }
});
module.exports = model("dbguild", documentSave); 