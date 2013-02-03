
var simplemapreduce = require('../..');

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    map: function (key, value, context, next) { context.emit(value.toLowerCase(), 1); next(); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result, next) { result.count += value; next(); }
};

simplemapreduce.runTask(task, function (err, result) { console.dir(result); });
