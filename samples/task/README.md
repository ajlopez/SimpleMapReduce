# Task sample with callback

The clasical program counting words packaged as a task, with a callback.

## Run

With the command line:
```
node run
```

The code:
```
var simplemapreduce = require('../..');

var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    map: function (key, value, context, next) { context.emit(value.toLowerCase(), 1); next(); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result, next) { result.count += value; next(); }
};

simplemapreduce.runTask(task, function (result) { console.dir(result); });
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

The implementation is naive. It uses `next` callbacks but without async calls in `map` or `process`.
If there were thousands of items or key/values produced by `map`, this approach would generate 
a lot of stacked calls.


