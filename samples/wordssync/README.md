# Synchronous Word Count sample

The clasical program counting words.

## Run

With the command line:
```
node run
```

The code:
```
var simplemapreduce = require('../..');

var result = simplemapreduce.runSync(
    ["A", "word", "is", "a", "word"], 
    function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    function (key) { return { count: 0 }; },
    function (key, value, result) { result.count += value; }
);

console.dir(result);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

