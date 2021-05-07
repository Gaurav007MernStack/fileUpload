const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs')

app.use(fileupload())

app.get('/', async (req, res, next) => {
    res.render('index')
})

app.post('/single', async (req, res, next) => {
    try {
        const file = req.files.mfile
        console.log(file)
        // directory path
        const dir = `./public/uploads/${path.extname(file.name)}`;
        // create new directory
        fs.mkdir(dir, (err) => {
            if (err) {
                console.log("Already Directory Created");
            }
            console.log("Directory is created.");
        });
        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join(__dirname, 'public', 'uploads', `${path.extname(file.name)}`, fileName)
        await file.mv(savePath)
        res.redirect('/')

    } catch (error) {
        console.log("error", error)
        res.send('Error uploading file')
    }
})

app.listen(3000, () => console.log("Server running on port 3000"))