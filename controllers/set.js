const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

const Set = require('../models/Set');

const path = require('path')
const fs = require('fs')
const inkjet = require('inkjet');
const chroma = require('chroma-js');
const Vibrant = require('node-vibrant')

// @desc    Create a set
// @route   POST /api/v1/set/create
// @access  Private
exports.create = asyncHandler(async (req, res, next) => {

    // Add user to req body
    req.body.user = req.user.id;

    // Calculate colors
    let hexColorArr;
    //new Array(100).fill('#fff')
    let hueColorArrs = {
        red:        [],
        orange:     [],
        yellow:     [],
        green:      [],
        blue:       [],
        magenta:    [],
    }

    let fileType = path.extname(req.file.path);

    // Convert Uint8Array to array of hex values
    function toHexString(byteArray) {
        return byteArray.reduce((output, elem, i) => {
            let hexString = (output + ('0' + elem.toString(16)).slice(-2))+'';
            if((i+1)%4==0) {
                return `${hexString}-#`
            }
            return hexString;
        },['#'])
    }

    // Color pallette for this image
    let vibrantColors = []
    await Vibrant.from(req.file.path).getPalette()
        .then((palette) => {
            for(let color in palette) {
                const type = color
                const hex = palette[color].getHex()
                vibrantColors.push({[type]: hex})
            }
        })

    // Get hue ranges from image
    if(fileType === '.png') {
        console.log('png')
    } else if(fileType === '.jpg' || fileType === '.JPG') {
        const buf = fs.readFileSync(req.file.path);

        imageByteArr = inkjet.decode(buf, async (err, decoded) => {

            const {data} = decoded;

            // Array HEX-based color values from image data
            hexColorArr = toHexString(Object.values(data)).split('-');

            // Arrange colors into group based on Hue HSL value
            await hexColorArr.map((hexValue) => {
                if(chroma.valid(hexValue)){
                    let hslValue =      chroma(hexValue).hsl();
                    let hue =           hslValue[0];
                    let saturation =    hslValue[1];
                    let lightness =     hslValue[2];
                    // console.log(hslValue)
                    if((hue >= 0 && hue <= 12) || (hue >= 349 && hue <= 360)) {
                        hueColorArrs.red.push(hslValue)
                    } 
                    else if(hue >= 13  && hue <= 36) {
                        hueColorArrs.orange.push(hslValue)
                    }
                    else if(hue >= 37  && hue <= 66) {
                        hueColorArrs.yellow.push(hslValue)
                    }
                    else if(hue >= 67  && hue <= 162) {
                        hueColorArrs.green.push(hslValue)
                    }
                    else if(hue >= 163 && hue <= 252) {
                        hueColorArrs.blue.push(hslValue)
                    }
                    else if(hue >= 253 && hue <= 348) {
                        hueColorArrs.magenta.push(hslValue)
                    }
                }
            })
        });
    }

    // Create a url to serve image in static folder
    const staticImagePath = `/images/${req.file.filename}`

    const set = await Set.create({
        name: req.body.name,
        image:  staticImagePath,
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
    const set = await Set.find({slug: req.params.id}).populate('user');

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