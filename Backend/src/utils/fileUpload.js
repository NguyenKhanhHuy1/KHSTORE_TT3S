import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now())
  }
})

const uploadFile = multer({ storage: storage })
module.exports = uploadFile