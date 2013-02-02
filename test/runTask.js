
var simplemapreduce = require('../'),
    assert = require('assert');

// runTask defined

assert.ok(simplemapreduce.runTask);
assert.equal(typeof simplemapreduce.runTask, 'function');

// Run count words

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    map: function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result) { result.count += value; }
};

var result = simplemapreduce.runTask(task, function (result) {
    assert.ok(result);
    assert.ok(result.a);
    assert.equal(result.a.count, 2);
    assert.ok(result.word);
    assert.equal(result.word.count, 2);
    assert.ok(result.is);
    assert.equal(result.is.count, 1);
});



