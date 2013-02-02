
var simplemapreduce = require('../'),
    assert = require('assert');

// mapReduceSync defined

assert.ok(simplemapreduce.mapReduceSync);
assert.equal(typeof simplemapreduce.mapReduceSync, 'function');

// Run count words

var result = simplemapreduce.mapReduceSync(
    ["A", "word", "is", "a", "word"], // items to process
    function (key, item, ctx) { ctx.emit(item.toLowerCase(), 1); }, // map
    function (key, values, ctx) { // reduce
        var total = 0;
        values.forEach(function (value) {
            total += value;
        });
        ctx.emit(key, total);
    }
);

assert.ok(result);
assert.ok(result.a);
assert.equal(result.a, 2);
assert.ok(result.word);
assert.equal(result.word, 2);
assert.ok(result.is);
assert.equal(result.is, 1);



