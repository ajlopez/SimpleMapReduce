# SimpleMapReduce

Simple MapReduce implementation, written in JavaScript.

## Installation

Via npm on Node:

```
npm install simplemapreduce
```


## Usage

Reference in your program:

```js
var simplemapreduce = require('simplemapreduce');
```

### Synchronous Map Reduce

Synchronous run
```js
simplemapreduce.mapReduceSync(items, mapfn, reducefn);
```
where

- `items`: to be processed. In the current version, it's an object with `forEach` function defined.
- `mapfn(key, value, ctx)`: given a key/value pair, it emits zero, one or more key/value pairs using `ctx`.
See example below.
- `reducefn(key, values, ctx)`: given a key and its associated values, emits zero, one or more key/value pairs using `ctx`.

Word count example
```js
var result = simplemapreduce.mapReduceSync(
    ["A", "word", "is", "a", "word"], // items to process
    function (key, value, ctx) { ctx.emit(value.toLowerCase(), 1); }, // map
    function (key, values, ctx) { // reduce
        var total = 0;
        values.forEach(function (value) {
            total += value;
        });
        ctx.emit(key, total);
    }
);

// result.a === 2
// result.word === 2
// result.is === 1
```

### Run

Synchronous run
```js
simplemapreduce.runSync(items, mapfn, newfn, processfn);
```
where

- `items`: to be processed. In the current version, it's an object with `forEach` function defined.
- `mapfn(item)`: given an item to be processed, it returns it's associated key..
- `newfn(item, key)`: given a new key, it returns the new object to be associated with that key.
- `processfn(item, result, [key, map])`: process an item, usually modifying its associated result object.
In addition, it could receive and use the associated key and the `map`, the dictionary that is being build by the
process.

Example
```js
var result = simplemapreduce.runSync(
    ["A", "word", "is", "a", "word"], 
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; }
);
console.dir(result);
```

Output
```
{ a: { count: 2 }, word: { count: 2 }, is: { count: 1 } }
```

There is a run with callback:
```js
simplemapreduce.run(items, mapfn, newfn, processfn);
```
under development. Current implementation internally uses `runSync`.
Example:
```js
simplemapreduce.run(
    ["A", "word", "is", "a", "word"], 
    function (item) { return item.toLowerCase(); },
    function (item, key) { return { count: 0 }; },
    function (item, result) { result.count++; },
    function (result) {
        console.dir(result);
    }
);
```

### Run Task

Alternatively, you can define a task, an object with functions:
- `getItems()`: return the items to be processed.
- `getKey(item)`: maps an item to its associated key.
- `getResult(item, key)`: creates a new object/value to be associated to the key/item. Usually it's used to accumulate results.
- `processItem(item, result, [key, map])`: function that process an item, usually updating the result object.

Example:

```js
var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    getKey: function (item) { return item.toLowerCase(); },
    getResult: function (item, key) { return { count: 0 }; },
    processItem: function (item, result) { result.count++; }
};

simplemapreduce.runTask(task, function (result) { console.dir(result); });
```
Notice that in this case, `getItems` returns items defined in the same task. You can provide a more complex function, i.e.
reading an stream or file.

## Development

```
git clone git://github.com/ajlopez/SimpleMapReduce.git
cd SimpleMapReduce
npm install
npm test
```

## Samples

[Words](https://github.com/ajlopez/SimpleMapReduce/tree/master/samples/words) Word Count sample with callback.

[Words Sync](https://github.com/ajlopez/SimpleMapReduce/tree/master/samples/wordssync) Synchronous Word Count sample.

[Task](https://github.com/ajlopez/SimpleMapReduce/tree/master/samples/task) Run Task sample with callback.

[Task Sync](https://github.com/ajlopez/SimpleMapReduce/tree/master/samples/tasksync) Synchrnous Run Task.

[Distributed Workers](https://github.com/ajlopez/SimpleMapReduce/tree/master/samples/worker) A server sending tasks
to distributed workers.

## To do

- Improve async procesing
- Distributed sample

## Versions

- 0.0.1 : Published, run, runSync
- 0.0.2 : Published, runTask, runTaskSync, first samples
- 0.0.3 : In master, work in progress. Distributed sample.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleMapReduce) and submit
[pull requests](https://github.com/ajlopez/SimpleMapReduce/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

