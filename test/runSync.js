
var simplemapreduce = require('../'),
    assert = require('assert');

// runSync defined

assert.ok(simplemapreduce.runSync);
assert.equal(typeof simplemapreduce.runSync, 'function');

// Run count words

var result = simplemapreduce.runSync(
    ["A", "word", "is", "a", "word"], 
    function (key, value, ctx) { ctx.emit(value.toLowerCase(), 1); },
    function (key) { return { word: key, count: 0 }; },
    function (key, value, result) { result.count += value; }
);

assert.ok(result);
assert.ok(result.a);
assert.equal(result.a.count, 2);
assert.ok(result.word);
assert.equal(result.word.count, 2);
assert.ok(result.is);
assert.equal(result.is.count, 1);

