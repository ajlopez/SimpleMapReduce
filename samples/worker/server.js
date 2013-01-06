
var simplemessages = require('simplemessages'),
    simplefunc = require('simplefunc');

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    getKey: function (item) { return item.toLowerCase(); },
    getResult: function (item, key) { return { count: 0 }; },
    processItem: function (item, result) { result.count++; }
};

// To encode functions
var encodedtask = simplefunc.encode(task);
// Message to send
var message = { task: encodedtask };

var server = simplemessages.createServer(function(client) { client.send(message); });

server.listen(3000);
console.log('Server listening on port 3000');
