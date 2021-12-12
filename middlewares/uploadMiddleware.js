const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        const types = /jpg|jpeg|png/
        const extName = types.test(path.extname(file.originalname.toLowerCase()))
        const mimeType = types.test(file.mimetype)

        if(extName && mimeType) {
            cb(null, true)
        }
        else {
            let error = new Error('Only images are accepted!')
            cb(error)
        }
    }
})

module.exports = upload