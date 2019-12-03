let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination: function(req, res, cb) {
        let outputPath = path.resolve(__dirname, "../public/upload/");
    cb(null, outputPath); 
    }, 
    filename: function(req, res, cb) {
        cb(null,`${Date.now}_${file.originalname}`)
    }
});
let fileFilter = (req, file, cb) => {
    let {mimetype} = file;
    if (mimetype == 'image/jpeg' || mimetype == 'image/png')
    {
        cb(null, true);
    }else{
        cb(new Error('loi kh dung file'));
    }
}

let upload = multer({storage: storage, fileFilter});
exports.upload = upload;