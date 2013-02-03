# Word Count sample with callback

The clasical program counting words.

## Run

With the command line:
```
node run
```

The code:
```
var simplemapreduce = require('../..');

simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context, next) { context.emit(value.toLowerCase(), 1); next(); },
    function (key) { return { count: 0 }; },
    function (key, value, result, next) { result.count += value; next(); },
    function (err, result) { console.dir(result); }
);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

The implementation is naive. It uses `next` callbacks but without async calls in `map` or `process`.
If there were thousands of items or key/values produced by `map`, this approach would generate 
a lot of stacked calls.

