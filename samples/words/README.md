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
    function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    function (key) { return { count: 0 }; },
    function (key, value, result) { result.count += value; },
    function (err, result) { console.dir(result); }
);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

