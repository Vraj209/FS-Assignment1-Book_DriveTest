const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

// Set middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


// connecting database
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: 'FullStack-Programming',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database Connected');
}).catch(err => console.log(err));


// Create Schema
const userSchema = mongoose.Schema({
    personalDetails: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        licensenumber: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true,
        },
        dob: {
            type: Date,
            required: true
        }
    },
    carDetails: {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        plateNumber: {
            type: String,
            required: true,
        },
    },


})

// Create Model
const User = mongoose.model('User', userSchema);

// Create new user

app.get('/', (req, res) => {
    res.render('Dashboard')
})

app.get('/login', (req, res) => {
    res.render('Login')
})

// G2-test API
app.get('/G2', (req, res) => {
    res.render('G2')
})

app.post('/G2', async (req, res) => {
    const firstName = req.body['first-name'];
    const lastName = req.body['last-name'];
    const licenseNumber = req.body['license-number'];
    const age = req.body.age;
    const dob = req.body.dob;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const plateNumber = req.body['plate-number'];


    const user = new User({
        personalDetails: {
            firstname: firstName,
            lastname: lastName,
            licensenumber: licenseNumber,
            age: age,
            dob: dob
        },
        carDetails: {
            make: make,
            model: model,
            year: year,
            plateNumber: plateNumber
        },
    });
    console.log(user);
    await user.save();
    res.redirect('/G')


})

// G-test API
app.get('/G', (req, res) => {
    // res.render('G')
    const licenseNumber = req.query['license-number']
    User.findOne({ 'personalDetails.licensenumber': licenseNumber })
        .then(user => {
            if (user) {
                res.render('G', { user, licenseNumber });
            } else {
                res.render('G', { user: null, licenseNumber })

            }
        }).catch(err => {
            console.log(err)
        })

})

// update cardetails
app.post('/G', async (req, res) => {
    const licenseNumber = req.body['license-number'];
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const plateNumber = req.body['plate-number'];

    try {
        await User.findOneAndUpdate(
            { 'personalDetails.licensenumber': licenseNumber },
            {
                $set: {
                    'carDetails.make': make,
                    'carDetails.model': model,
                    'carDetails.year': year,
                    'carDetails.plateNumber': plateNumber
                }
            }
        );
        await User.save();
        res.redirect('/G');
    } catch (err) {
        console.log(err);
        res.redirect('/G');
    }
});




// listen to 5000 port
app.listen(5000, () => {
    console.log('server is running')
});





