
var simplemapreduce = require('../..');

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    function (key) { return { count: 0 }; },
    function (key, value, result) { result.count += value; },
    function (err, result) { console.dir(result); }
);
