const { Router } = require('express'); 
const router = new Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// RENDER FORM UPLOAD
/*router.get('/images/upload', (req, res) => {
    res.render('index');
});*/



const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
}).single('image');

router.post('/photo', (req, res) => {
    console.log(req.body);
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        console.log(path.resolve(__dirname,`../uploads${file.originalname}`));
        res.send('uploaded');
    });
});

router.get('/photo', (req, res) => {
    res.send("hello");
});


module.exports = router;