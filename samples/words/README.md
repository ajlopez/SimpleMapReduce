# Words Sample with callback

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
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; },
    function (result) { console.dir(result); }
);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

