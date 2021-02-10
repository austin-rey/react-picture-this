const express = require('express')
const multer  = require('multer')
const app = express()

const {create,viewSets,viewSet,deleteSet } = require('../controllers/set')

const { protect } = require('../middleware/auth');

const router = express.Router();

// Define where images are going to be stored
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './public/uploadedImages')
    },
    filename: function(req,file,cb) {
        cb(null, Date.now() + file.originalname)
    }
})

// Return error if file is not correct extension
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3000000
    },
    fileFilter: fileFilter
})


router.post('/create',protect, upload.single('myImage'), create);
router.get('/',protect, viewSets);
router.get('/:id',protect, viewSet);
router.delete('/:id',protect, deleteSet);

module.exports = router;