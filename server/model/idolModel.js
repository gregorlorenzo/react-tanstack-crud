//create a model for kpop idols which includes their stage name, birth name, position, birthday, height, weight
const mongoose = require("mongoose");

const Idol = mongoose.model(
	"Idol",
    new mongoose.Schema({
        stageName: {
            type: String,
            required: true
        },
        birthName: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    })
)

module.exports = Idol