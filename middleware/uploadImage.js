const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, '../upload-image'))
    },
    filename: (req, file, cb) => {

        const fullFileName = `${Date.now()}_${Math.round(Math.random() * 1000)}${path.extname(file.originalname)}`

        cb(null, fullFileName)
    }
})


module.exports = multer({ storage })
