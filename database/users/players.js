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
        farm: {
            owner: { type: Boolean, default: false },
            seeds: {
                batata: {
                    count: { type: Number, default: 0 },
                    max: 10,
                    coins: 300,
                    cooldown: { type: Number, default: 0 },
                },
                arroz: {
                    count: { type: Number, default: 0 },
                    max: 20,
                    coins: 200,
                    cooldown: { type: Number, default: 0 },
                },
                trigo: {
                    count: { type: Number, default: 0 },
                    max: 16,
                    coins: 170,
                    cooldown: { type: Number, default: 0 },
                },
                milho: {
                    count: { type: Number, default: 0 },
                    max: 15,
                    coins: 150,
                    cooldown: { type: Number, default: 0 },
                },
                cenoura: {
                    count: { type: Number, default: 0 },
                    max: 5,
                    coins: 50,
                    cooldown: { type: Number, default: 0 },
                },
            }
        },
        timers: {
            dailyCooldown: { type: Number, default: 0 },
            workCooldown: { type: Number, default: 0 },
            gfCooldown: { type: Number, default: 0 },
        }
    }
});
module.exports = model("dbuser", documentSave);
