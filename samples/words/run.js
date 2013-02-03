
var simplemapreduce = require('../..');

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context, next) { context.emit(value.toLowerCase(), 1); next(); },
    function (key) { return { count: 0 }; },
    function (key, value, result, next) { result.count += value; next(); },
    function (err, result) { console.dir(result); }
);
