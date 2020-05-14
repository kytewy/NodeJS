const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true })
    .then(() => console.log("Connected to the database"))
    .catch(() => console.log("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    data: { type: Date, default: Date.now },
    isPublished: Boolean
})

// Classes and objects
// Human, John

const course = mongoose.model('Course', courseSchema);
