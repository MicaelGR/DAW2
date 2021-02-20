const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 7,
        max: 32
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 10
    },
    date : {
        type: Date,
        default: Date.now
    }
}, {
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000
        }
    });

module.exports = mongoose.model('User', userSchema);