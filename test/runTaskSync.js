
var simplemapreduce = require('../'),
    assert = require('assert');

// runTaskSync defined

assert.ok(simplemapreduce.runTaskSync);
assert.equal(typeof simplemapreduce.runTaskSync, 'function');

// Run count words

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    getKey: function (item) { return item.toLowerCase(); },
    getResult: function (item, key) { return { word: key, count: 0 }; },
    processItem: function (item, result) { result.count++; }
};

var result = simplemapreduce.runTaskSync(task);

assert.ok(result);
assert.ok(result.a);
assert.equal(result.a.count, 2);
assert.ok(result.word);
assert.equal(result.word.count, 2);
assert.ok(result.is);
assert.equal(result.is.count, 1);


