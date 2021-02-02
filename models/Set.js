const mongoose = require('mongoose');

const SetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a set name.'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image path.']
    },
    colors: {
        type: Array,
        required: [true, 'Please add add colors.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Set', SetSchema)