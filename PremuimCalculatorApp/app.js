const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const moment = require('moment');
const cors = require('cors');
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.error = err;
    res.locals.error.status = err.status || 500;
    if (process.env.NODE_ENV === 'production') {
        delete err.stack;
    } else if (err.code === 'permission_denied') {
        res.status(403).send('Forbidden');
    } else if (err.code === 'permissions_not_found') {
        res.status(403).send('Could not find permissions for user. Bad configuration');
    } else if (err.code === 'user_object_not_found') {
        res.status(403).send('user object "user" was not found. Check your configuration.');
    }

    res.locals.title = 'Error';
    console.error(err);

    // Render the error page
    res.status(err.status || 500);
});

//routes
app.get('/premium/:dob/:state/:age', (req, res) => {
    if (req.query.dob && req.query.state && req.query.age) {
        let dob = req.query.dob, state = req.query.state, age = req.query.age, month = moment(dob).month();
        let premium = 0;
        if (state === 'NY') {
            if (month === 7 && age >= 18 && age <= 45)//August
            {
                premium = 150;
            }
            else if (month === 0 && age >= 46 && age <= 65)//January
            {
                premium = 200.50;
            }
            else if (age >= 18 && age <= 65) {
                premium = 120.99;
            }
        }
        else if (state === 'AL') {
            if (month === 10 && age >= 18 && age <= 65)//November
            {
                premium = 85.5;
            }
            else if (age >= 18 && age <= 65) {
                premium = 120.99;
            }
        }
        else if (state === 'AK') {
            if (month === 11 && age >= 18 && age <= 64)//December
            {
                premium = 125.16;
            }
            else if (month === 11 && age >= 65)//December
            {
                premium = 175.20;
            }
            else if (age >= 18 && age <= 65) {
                premium = 100.80;
            }
        }
        else if (age >= 18 && age <= 65) {
            premium = 90;
        }
        else {
            return res.json({
                success: false,
                message: 'No Premium plan available for the provided data'
            })
        }
        return res.json({
            premium: premium
        })
    }
    else {
        res.json({
            success: false,
            message: 'Date of Birth, State and Age are required fields, but are missing!'
        })
    }
})

app.listen(3000, () => {
    console.log("Server started...");
});//node listening on port 3000.


module.exports = app