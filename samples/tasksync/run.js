
var simplemapreduce = require('../..');

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    getKey: function (item) { return item.toLowerCase(); },
    getResult: function (item, key) { return { count: 0 }; },
    processItem: function (item, result) { result.count++; }
};

var result = simplemapreduce.runTaskSync(task);

console.dir(result);

