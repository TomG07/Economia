const { Schema, model } = require("mongoose");
const documentSave = new Schema({
    userId: { type: String },
    guild: {
        editor: { type: Boolean, default: false },
    },
    inv: {
        magicwand: { type: Boolean, default: false },
    },
    eco: {
        coins: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
        job: { type: String, default: null },
        badges: { type: Array, default: [] },
        marry: {
            userId: { type: String, default: null },
            marryDate: { type: Number, default: 0 },
        },
        reps: { type: Number, default: 0 },
        premium: {
            status: { type: Boolean, default: false },
            timestamp: { type: Number, default: 0 },
            expired: { type: Number, default: 0 },
        },
        farm: {
            owner: { type: Boolean, default: false },
            seeds: {
                batata: {
                    count: { type: Number, default: 0 },
                    max: { type: Number, default: 10 },
                    coins: { type: Number, default: 300 },
                    cooldown: { type: Number, default: 0 },
                },
                arroz: {
                    count: { type: Number, default: 0 },
                    max: { type: Number, default: 10 },
                    coins: { type: Number, default: 200 },
                    cooldown: { type: Number, default: 0 },
                },
                trigo: {
                    count: { type: Number, default: 0 },
                    max: { type: Number, default: 12 },
                    coins: { type: Number, default: 100 },
                    cooldown: { type: Number, default: 0 },
                },
                milho: {
                    count: { type: Number, default: 0 },
                    max: { type: Number, default: 10 },
                    coins: { type: Number, default: 150 },
                    cooldown: { type: Number, default: 0 },
                },
                cenoura: {
                    count: { type: Number, default: 0 },
                    max: { type: Number, default: 5 },
                    coins: { type: Number, default: 50 },
                    cooldown: { type: Number, default: 0 },
                },
            }
        },
        timers: {
            dailyCooldown: { type: Number, default: 0 },
            workCooldown: { type: Number, default: 0 },
            gfCooldown: { type: Number, default: 0 },
            repCooldown: { type: Number, default: 0 },
        }
    }
});
module.exports = model("dbuser", documentSave);
