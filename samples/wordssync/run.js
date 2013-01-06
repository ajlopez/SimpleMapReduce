
var simplemapreduce = require('../..');

var result = simplemapreduce.runSync(
    ["A", "word", "is", "a", "word"], 
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; }
);

console.dir(result);
