const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

const Set = require('../models/Set');

const path = require('path')
const fs = require('fs')

const chroma = require('chroma-js');
const Vibrant = require('node-vibrant')
const inkjet = require('inkjet')
const clean = require('xss-clean/lib/xss').clean

// @desc    Create a set
// @route   POST /api/v1/set/create
// @access  Private
exports.create = asyncHandler(async (req, res, next) => {

    // Add user to req body
    req.body.user = req.user.id;

    let hueColorArrs = {
        Vibrant:      [],
        DarkVibrant:  [],
        LightVibrant: [],
        Muted:        [],
        DarkMuted:    [],
        LightMuted:   [],
    };

    // Return prominent colors found in the image
    let vibrantColors = [];
    await Vibrant.from(req.file.path).quality(3).getPalette()
        .then((palette) => {
            console.log(palette)
            for(let color in palette) {
                const type = color;
                const hex = palette[color].getHex();
                vibrantColors.push({[type]: hex});
                hueColorArrs[type] = chroma.scale([chroma(hex).darken(6), hex, chroma(hex).brighten(6)]).colors(12);
            }
    })

    const set = await Set.create({
        name: clean(req.body.name),
        imageName: req.file.filename,
        imagePath:  req.imageLocation,
        user: req.body.user,
        pallette: vibrantColors,
        colorRange: hueColorArrs
    })

    res.status(200).json({ success: true, data: set });
})

// @desc    View a set
// @route   GET /api/v1/set/:id
// @access  Private
exports.viewSet = asyncHandler(async (req, res, next) => {

    console.log(req.params.id);
    const set = await Set.find({_id: req.params.id}).populate('user');

    if (!set) {
        return next(
          new ErrorResponse(`No course with the id of ${req.params.id}`),
          404
        );
    }

    res.status(200).json({ success: true, data: set });
})

// @desc    View all sets
// @route   GET /api/v1/set/
// @access  Private
exports.viewSets = asyncHandler(async (req, res, next) => {
    const sets = await Set.find({}).select('-colorRange').populate('user');
    res.status(200).json(res.advancedResults);
})

// @desc    Delete a set
// @route   DELETE /api/v1/set/:id
// @access  Private
exports.deleteSet = asyncHandler(async (req, res, next) => {
    const set = await Set.findById(req.params.id);

    if (!set) {
        return next(
          new ErrorResponse(`No course with the id of ${req.params.id}`),
          404
        );
    }

    if(set.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse(`Not authorized to delete this set`),
            401
          );
    }
    set.remove();

    res.status(200).json({ success: true});
})

// @desc    Update a set
// @route   PUT /api/v1/set/update/:id
// @access  Private

// TODO: How will users be able to update their sets
// Check that the sets user id equals the requests user id