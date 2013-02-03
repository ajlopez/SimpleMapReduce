
var simplemapreduce = require('../../'),
    simplemessages = require('simplemessages'),
    simplefunc = require('simplefunc');

var client = simplemessages.createClient();

client.on('message', function(msg) {
    if (!msg.task)
        return;

    var encodedtask = msg.task;
    var task = simplefunc.decode(encodedtask);
    simplemapreduce.runTask(task,
        function (err, result) { console.dir(result); process.exit(0); });
});

client.connect(3000, 'localhost');

