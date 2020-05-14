const Joi = require('joi');
const express = require("express");
const app = express();
const genres = require("./router/genres")

app.use(express.json());
app.use("/api/genres/", genres)
// creating course object

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