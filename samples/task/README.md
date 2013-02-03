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
    map: function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result) { result.count += value; }
};

simplemapreduce.runTask(task, function (result) { console.dir(result); });
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

