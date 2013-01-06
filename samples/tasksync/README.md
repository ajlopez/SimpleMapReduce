# Synchronous Task sample

The clasical program counting words packaged as a task.

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

var result = simplemapreduce.runTaskSync(task);

console.dir(result);
```

The output:
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

