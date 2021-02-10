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
    let hueColorArrs = {
        red: [],
        orange: [],
        yellow: [],
        green: [],
        blue: [],
        magenta: [],
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

                const population = palette[color].getPopulation()
                const hsl = palette[color].getHsl()
                const hex = palette[color].getHex()

                vibrantColors.push({[type]: hex})
                // console.log(vibrantColors)
            }
        })

    // Get hue ranges from image
    if(fileType === '.png') {
        console.log('png')
    } else if(fileType === '.jpg') {
        const buf = fs.readFileSync(req.file.path);

        imageByteArr = inkjet.decode(buf, (err, decoded) => {

            const {data} = decoded;

            // Array HEX-based color values from image data
            hexColorArr = toHexString(Object.values(data)).split('-');

            // Arrange colors into group based on Hue HSL value
            hexColorArr.map((hexValue) => {
                if(chroma.valid(hexValue)){
                    let hslValue = chroma(hexValue).hsl();
                    let hue = Math.ceil(hslValue[0]);

                    if(hue >= 0 && hue <= 29)           {hueColorArrs.red.push(hslValue)} 
                    else if(hue >= 30  && hue <= 59)    {hueColorArrs.orange.push(hslValue)}
                    else if(hue >= 60  && hue <= 89)    {hueColorArrs.yellow.push(hslValue)}
                    else if(hue >= 90  && hue <= 179)   {hueColorArrs.green.push(hslValue)}
                    else if(hue >= 180 && hue <= 269)   {hueColorArrs.blue.push(hslValue)}
                    else if(hue >= 270 && hue <= 359)   {hueColorArrs.magenta.push(hslValue)}
                }
            })
        });
    }

    // Create a url to serve image in static folder
    const hostname = req.headers.host;
    const staticImagePath = `http://${hostname}/images/${req.file.filename}`

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
    res.status(200).json({ success: true, data: sets });
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