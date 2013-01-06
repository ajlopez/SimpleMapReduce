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
    getKey: function (item) { return item.toLowerCase(); },
    getResult: function (item, key) { return { count: 0 }; },
    processItem: function (item, result) { result.count++; }
};

simplemapreduce.runTask(task, function (result) { console.dir(result); });
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

