
var simplemapreduce = require('../'),
    assert = require('assert');

// runSync defined

assert.ok(simplemapreduce.runSync);
assert.equal(typeof simplemapreduce.runSync, 'function');

// Run count words

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { word: key, count: 0 }; },
    function (item, result) { result.count++; },
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

