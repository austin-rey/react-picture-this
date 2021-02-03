const mongoose = require('mongoose');
const slugify = require('slugify');

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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String
    }
})

// Create bootcamp slug from name
SetSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true,replacement: '-' });
    next();
});

  
module.exports = mongoose.model('Set', SetSchema)