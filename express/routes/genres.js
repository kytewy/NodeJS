const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "rock"},
    { id: 2, name: "Pop"},
    { id: 3, name: "R&B"}
];

// getting ALL genres id
// route parameters: essentail/required values
router.get("/", (req, res) => {
    res.send(genres);
});

// change to int so it can be a boolean
router.get("/", (req, res) => {
    const course = genres.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course was not found.");
    res.send(course);
});

// Updating the 
router.post("/", (req, res) => {    
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;