// importing an entire object or function
// const logger = new require('./logger')

const log = new require('./logger');


function sayHello(name) {
    console.log("Hello" + name);
}

// log('message');

// path module
const path = require('path');

var pathObj = path.parse(__filename);
// console.log(pathObj);

// OS module
const os = require('os');

var total_mem = os.totalmem()
var free_mem = os.freemem()

// console.log(free_mem, total_mem);

// console.log('Total Memory: \${total_mem + free_mem}');
// console.log("Free Memory: " + free_mem);

// working with file systems

const fs = require('fs');

var filesys = fs.readdir('./', function(err, files) {
    if (err) console.log("Error", err);
    //else console.log("Result", files);
});

const EventEmitter = require('events');

//When you raise an event, you need to make sure there is a listener
const emitter = new EventEmitter();

//register listener // replace function w =>
emitter.on('messageLogged', (arg) => {
    console.log("listener called", arg);
});

const Logger = require('./logger');
const logger = new Logger();
logger.log("message");

