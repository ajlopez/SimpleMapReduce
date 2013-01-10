
var simplemapreduce = require('../'),
    assert = require('assert');

// mapReduce defined

assert.ok(simplemapreduce.mapReduce);
assert.equal(typeof simplemapreduce.mapReduce, 'function');

// Run count words

simplemapreduce.mapReduce(
    ["A", "word", "is", "a", "word"], // items to process
    function (item, ctx, next) { ctx.emit(item.toLowerCase(), 1); next(); }, // map
    function (key, values, ctx, next) { // reduce
        var total = 0;
        values.forEach(function (value) {
            total += value;
        });
        ctx.emit(key, total);
        next();
    },
    function (result) {
        assert.ok(result);
        assert.ok(result.a);
        assert.equal(result.a, 2);
        assert.ok(result.word);
        assert.equal(result.word, 2);
        assert.ok(result.is);
        assert.equal(result.is, 1);
    }
);
