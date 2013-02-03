
var simplemessages = require('simplemessages'),
    simplefunc = require('simplefunc');

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    map: function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result) { result.count += value; }
};

// To encode functions
var encodedtask = simplefunc.encode(task);
// Message to send
var message = { task: encodedtask };

var server = simplemessages.createServer(function(client) { client.send(message); });

server.listen(3000);
console.log('Server listening on port 3000');
