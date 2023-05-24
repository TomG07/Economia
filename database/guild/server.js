const { Schema, model } = require("mongoose");
const documentSave = new Schema({
    _id: { type: String },
    g: {
        status: { type: Boolean, default: false },
        repUser: { type: String, default: null },
        sendDate: { type: Number, default: 0 },
        partner: { type: Boolean, default: false },
        approvedBy: { type: String, default: null },
        approvedDate: { type: Number, default: 0 },
        blacklist: { type: Boolean, default: false },
        dmWelcome: {
            status: { type: Boolean, default: false },
            content: { type: String, default: null },
        }
    }
});
module.exports = model("dbguild", documentSave); 