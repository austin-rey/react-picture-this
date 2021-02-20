const mongoose = require('mongoose');
const slugify = require('slugify');

const SetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a set name.'],
        min: [6, 'Title is must be more than or equal to 6 characters.'],
        max: [64, 'Title is must be less than or equal to 64 characters.']
    },
    image: {
        type: String,
        required: [true, 'Please add an image path.']
    },
    pallette: {
        type: Array,
        required: [true, 'Please add add colors.']
    },
    colorRange: {
        type: Object,
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

// Create index for search support on the following fields
SetSchema.index({name: 'text'});
  
module.exports = mongoose.model('Set', SetSchema)