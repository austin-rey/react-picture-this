const multer  = require('multer')

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
    if(file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: fileFilter
})

module.exports = upload;