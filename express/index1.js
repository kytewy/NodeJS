const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());
// creating course object
const genres = [
    { id: 1, name: "rock"},
    { id: 2, name: "Pop"},
    { id: 3, name: "R&B"}
];

// getting ALL genres id
// route parameters: essentail/required values
app.get("/api/genres/", (req, res) => {
    res.send(genres);
});

// change to int so it can be a boolean
app.get("/api/genres/:id", (req, res) => {
    const course = genres.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found.");
    res.send(course);
});

// Updating the 
app.post("/api/genres/", (req, res) => {    
    const { error } = validateCourse(req.body); // getting the property result.error
    if (error) return res.status(400).send(error.details[0].message);

    // setting new object
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    /// array object, pushing to server then returning res
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    // look up the course, if not existing, result 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre was not found.");

    // Validate, if invalid return 400 - Bad Requested
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // getting the property result.error
    if (error) return res.status(400).send(error.details[0].message);

    // Update course, return updated course
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    // look up course, not exting reutn 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The course was not found.");

    // delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the same course
    res.send(genre);
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