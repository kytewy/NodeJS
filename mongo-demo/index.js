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

// Classes and objects / Human and John

// Creating a class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Python Course",
        author: "Wyatt",
        tags: [ "learning", "Data Science", "back-end"],
        isPublished: true
    });

    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    // comparison operators 
    // eq (not equal) 
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

// FInding something greater than 10 and less than 20
// find({ price: {$gte: 10, $lte:20 }})
// find({ price: {$in: [10, 15, 20] }})

    const courses = await Course
    .find( {tags: 'Data Science'})
    .limit(10)
    .sort( {name : 1 })
    .select( {name : 1, tags: 1});
    console.log(courses)
} 

getCourses();