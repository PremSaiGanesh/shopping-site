// for the image upload in the admin panel
const multer = require('multer');
const uuid = require('uuid').v4; // for the unique filename

const upload = multer({
    storage : multer.diskStorage({
        destination : 'product-data/images',
        filename: function(req,file,cb) {
            cb(null,uuid()+'-'+file.originalname);
        }
    })
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;