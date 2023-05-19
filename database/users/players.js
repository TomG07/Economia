const { Schema, model } = require("mongoose");
const documentSave = new Schema({
    _id: { type: String },
    eco: {
        coins: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
        job: { type: String, default: null },
        badges: { type: Array, default: [] }, 
        marry: {
            userId: { type: String, default: null },
            marryDate: { type: Number, default: 0 },
        },
        timers: {
            dailyCooldown: { type: Number, default: 0 },
            workCooldown: { type: Number, default: 0 },
            gfCooldown: { type: Number, default: 0 },
        }
    }
});
module.exports = model("dbuser", documentSave);
