// Events, Class is an human and an object is john
const EventEmitter = require('events');

//When you raise an event, you need to make sure there is a listener
//const emitter = new EventEmitter();

var url = 'http://localhost'

//exporting an entire object
//module.exports.log = log;

class Logger extends EventEmitter {
    log(message) {
        //Send an HTTP request
        console.log(message);
    
        // raise event // When using {} you an encapsulating an object, when sending multiple 
        this.emit("messageLogged", { id: 1, url: "http" });
    }
}

//exporting a function
module.exports = Logger;