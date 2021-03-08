const express = require('express')
const app = express()
const router = express.Router();

const {create,viewSets,viewSet,deleteSet } = require('../controllers/set')

const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const imageUpload = require('../middleware/imageUpload');
const {awsImageUpload,awsImageDelete} = require('../middleware/awsImageStorage')
const Set = require('../models/Set');

router.post('/create',protect, imageUpload.single('myImage'),awsImageUpload, create);
router.get('/',protect, advancedResults(Set, 'user'), viewSets);
router.get('/:id',protect, viewSet);
router.delete('/:id',protect,awsImageDelete, deleteSet);

module.exports = router;