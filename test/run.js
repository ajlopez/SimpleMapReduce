
var simplemapreduce = require('../'),
    assert = require('assert');

// runSync defined

assert.ok(simplemapreduce.run);
assert.equal(typeof simplemapreduce.run, 'function');

// Run count words

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context, next) { context.emit(value.toLowerCase(), 1); next(); },
    function (key) { return { word: key, count: 0 }; },
    function (key, value, result, next) { result.count += value; next(); },
    function (err, result) {
        assert.ok(!err);
        assert.ok(result);
        assert.ok(result.a);
        assert.equal(result.a.count, 2);
        assert.ok(result.word);
        assert.equal(result.word.count, 2);
        assert.ok(result.is);
        assert.equal(result.is.count, 1);
    }
);

