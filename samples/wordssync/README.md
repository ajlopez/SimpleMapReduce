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
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; }
);

console.dir(result);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

