const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Set = require('../models/Set');

// @desc    Create a set
// @route   POST /api/v1/set/create
// @access  Private
exports.create = asyncHandler(async (req, res, next) => {
    
    // TODO - Analyze image and return colors
    const imageColors = () => {
        return [
            {'#ED6B5A': ['#F18C7E','#EF7B6C','#ED6B5A','#EB5A47','#E94A35']},
            {'#8CAE6F': ['#A0BD89','#96B67C','#8CAE6F','#82A762','#789D58']},
            {'#F0EBA8': ['#F6F3CB','#F3EFBA','#F0EBA8','#EDE796','#EAE485']},
            {'#9BC0BB': ['#B4D0CC','#A7C8C3','#9BC0BB','#8EB8B3','#82B0AB']},
            {'#625C70': ['#766E87','#6C657B','#625C70','#585365','#4E495A']}
        ];
    }

    const set = await Set.create({
        setID: req.body.setID,
        name: req.body.name,
        image:  req.file.path,
        colors: imageColors()
    })

    const createdSet = await Set.findById(set._id, "-_id").exec();

    res.status(200).json({ success: true, data: createdSet });
})

// @desc    View a set
// @route   GET /api/v1/set/view/:id
// @access  Private
exports.viewSet = asyncHandler(async (req, res, next) => {
    const set = await Set.find({setID: req.params.id}, "-_id");
    res.status(200).json({ success: true, data: set });
})

// @desc    View all sets
// @route   GET /api/v1/set/view/
// @access  Private
exports.viewSets = asyncHandler(async (req, res, next) => {
    const sets = await Set.find({}, "-_id");
    res.status(200).json({ success: true, data: sets });
})

// @desc    Delete a set
// @route   DELETE /api/v1/set/delete/:id
// @access  Private
exports.deleteSet = asyncHandler(async (req, res, next) => {
    const sets = await Set.findOneAndDelete({setID: req.params.id});
    res.status(200).json({ success: true});
})

// @desc    Update a set
// @route   PUT /api/v1/set/update/:id
// @access  Private