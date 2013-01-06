
var simplemapreduce = require('../..');

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; },
    function (result) { console.dir(result); }
);
