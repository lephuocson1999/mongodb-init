let {upload} = require('../MiddleWare/multer.middleware');

let uploadSingle = upload.single('avatar');
let uploadArray = upload.array('photos',4);
let uploadFields = upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'gallery', maxCount: 10}
]);

module.exports = {
    uploadSingle,
    uploadArray,
    uploadFields
}