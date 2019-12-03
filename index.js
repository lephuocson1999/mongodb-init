let express = require('express');
let app = express();
let mongoose = require('mongoose');
let uri = `mongodb://localhost:27017/mern_2410`;
let {USER_MODEL} = require('./models/user');
let bodyParser = require('body-parser');
let {upload} = require('./middleware/multer.middleware');
let { uploadSingle,
    uploadArray,
    uploadFields}   = require('./helpers/upload.config');
let path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views', './views/');

app.get('/', async (req,res) => {
    
    let listUsers = await USER_MODEL.find({}).sort({creatAt: -1});
    
    res.json({listUsers});
});

app.get('/list-user', async (req,res) => {
    
    let listUsers = await USER_MODEL.find({}).sort({creatAt: -1});
    
    res.render('list-user',{listUsers, infoUser: undefined});
});

app.get('/infouser/:userID', async (req, res) => {
    let {userID} = req.params;
    let infoUsers = await USER_MODEL.findById(userID);
    // let infoUsers2 = await USER_MODEL.findOne({
    //     _id: userIDs
    // });
    res.json({infoUsers});
});

app.post('/add-user',uploadFields, async (req, res) => {
    let {username,password, age, fullname} = req.body;
    let {avatar, gallery} = req.files;

    // let pathAvatar = Array.isArray(USER_MODEL.avatar) && USER_MODEL.avatar.length > 0 ? USER_MODEL.avatar[0].filename: 'default.png';
    // let pathGallery = await USER_MODEL.gallary.map(itemGallary => itemGallary.filename);
        
    
    let infoUserForInsert = new USER_MODEL({
        username,password, age, fullname, avatar: pathAvatar, gallery: pathGallery
    });
    let infoUserAfterInsert = await infoUserForInsert.save();
    console.log(infoUserAfterInsert);
    //res.json({infoUserAfterInsert}); 
    //listUsers.push(infoUserAfterInsert);
    res.redirect('/list-user');
});

app.get('/remove-user/:username', async (req, res) => {
    let {username} = req.params;
    let infoUserAfterRemove = await USER_MODEL.findOneAndDelete({
        username
    });
    console.log(infoUserAfterRemove);
    
    res.redirect('/list-user');
});
app.route('/update-user/:username')
    .get(async (req, res) => {
        let {username} = req.params;
        let infoUser = await USER_MODEL.findOne({
            username
        });
        let listUsers = await USER_MODEL.find({}).sort({creatAt: -1});
        res.render('list-user',{
            listUsers,
            infoUser
        });
    })
    .post(async (req, res) => {
        let {username: usernameOld} = req.params;
        let {username , password, age, fullname} = req.body;
        let infoUserAfterUpdate = await USER_MODEL.findOneAndUpdate({
            username: usernameOld
        },{
            username,password, age, fullname
        },{
            new: true,
            
        });
        res.redirect('/list-user');
});

mongoose.connect(uri);
mongoose.connection.once('open', function() {
    console.log(`mongodb connected`);
    app.listen(3000, () => console.log('server started at port 3000')
);
});

