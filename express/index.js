const config = require('config');
const helmet = require('helmet');
const Joi = require('joi');
const express = require("express");
// instantiating 
const app = express();


app.use(express.json());
app.use(helmet());

console.log("Application Name: " + config.get('name'));
console.log("Mail Server Name: " + config.get('mail.host'));

// creating course object
const courses = [
    { id: 1, name: "course1"},
    { id: 2, name: "course2"},
    { id: 3, name: "course3"}
];

// different http verbs
app.get("")
app.post("")
app.put("")
app.delete("")

// path, input into funcrion and response
// req and res are called the handler
app.get("/", (req, res) => {
    res.send('Hello World!');
});

// this needs to go before the listen
app.get("/api/", (req, res) => {
    res.send([1,2,3]);
});

// getting ALL courses id
// route parameters: essentail/required values
app.get("/api/courses/", (req, res) => {
    res.send(courses);
});

// change to int so it can be a boolean
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found.");
    res.send(course);
});

app.post("/api/courses/", (req, res) => {    
    const { error } = validateCourse(req.body); // getting the property result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // setting new object
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    /// array object, pushing to server then returning res
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up the course, if not existing, result 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found.");

    // Validate, if invalid return 400 - Bad Requested
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // getting the property result.error
    if (error) return res.status(400).send(error.details[0].message);

    // Update course, return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // look up course, not exting reutn 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found.");

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


// We can use query string params to add additional data 
// query strong paramters for anything optional, stored in key value pairs ?
// localhost:3000/api/posts/2018/1?sortBy=name
app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});


// port to listen on
// app.listen(3000, (req, res) => {
//     console.log('Listen on port 3000');
// });

// creating a environment variable for port. use it or 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// http://vidley.com/api/genres/