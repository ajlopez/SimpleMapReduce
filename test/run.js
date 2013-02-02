
var simplemapreduce = require('../'),
    assert = require('assert');

// runSync defined

assert.ok(simplemapreduce.run);
assert.equal(typeof simplemapreduce.run, 'function');

// Run count words

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    function (key) { return { word: key, count: 0 }; },
    function (key, value, result) { result.count += value; },
    function (result) {
        assert.ok(result);
        assert.ok(result.a);
        assert.equal(result.a.count, 2);
        assert.ok(result.word);
        assert.equal(result.word.count, 2);
        assert.ok(result.is);
        assert.equal(result.is.count, 1);
    }
);

