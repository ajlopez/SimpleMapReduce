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

```

### Map Reduce
```js
simplemapreduce.mapReduceSync(items, mapfn, reducefn, callbackfn);
```
where

- `items`: to be processed. In the current version, it's an object with keys that can be obtained using `Object.keys(items)`.
- `mapfn(key, value, ctx, next)`: given a key/value pair, it emits zero, one or more key/value pairs using `ctx`.
See example below.
- `reducefn(key, values, ctx, next)`: given a key and its associated values, emits zero, one or more key/value pairs using `ctx`.
- `callbackfn(err, results)`: `results` is a dictionary with the key/value reduce outcome.

```js
simplemapreduce.mapReduce(
    ["A", "word", "is", "a", "word"], // items to process
    function (key, value, ctx, next) { ctx.emit(value.toLowerCase(), 1); next(); }, // map
    function (key, values, ctx, next) { // reduce
        var total = 0;
        values.forEach(function (value) {
            total += value;
        });
        ctx.emit(key, total);
        next();
    },
    function (err, result) {
		// result.a === 2
		// result.word === 2
		// result.is === 1
    }
);
```
The above example is simple: it is executed without doing async calls in the map/reduce functions. But you
can call next callback at any time.

### Run

Synchronous run
```js
simplemapreduce.runSync(items, mapfn, newfn, processfn);
```
where

- `items`: to be processed. In the current version, it's an object with `forEach` function defined.
- `mapfn(key, value, ctx)`: given a key/value pair, it emits zero, one or more key/value pairs using `ctx`.
- `newfn(key)`: given a new key, it returns the new object to be associated with that key.
- `processfn(key, value, result)`: process an item, usually modifying its associated result object.
In addition, it could receive and use the associated key and the `map`, the dictionary that is being build by the
process.

Example
```js
var result = simplemapreduce.runSync(
    ["A", "word", "is", "a", "word"], 
    function (key, value, ctx) { ctx.emit(value.toLowerCase(), 1); },
    function (key) { return { word: key, count: 0 }; },
    function (key, value, result) { result.count += value; }
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
    function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    function (key) { return { word: key, count: 0 }; },
    function (key, value, result) { result.count += value; },
    function (err, result) {
		if (err)
			console.log(err);
		else
			console.dir(result);
	}
);
```

### Run Task

Alternatively, you can define a task, an object with functions:
- `getItems()`: return the items to be processed.
- `mapfn(key, value, ctx, next)`: given a key/value pair, it emits zero, one or more key/value pairs using `ctx`.
- `newResult(key)`: creates a new object/value to be associated to the key/item. Usually it's used to accumulate results.
- `process(key, value, result)`: function that process a key/value pair, usually updating the associated result object.

Example:

```js
var task = {
    items: ["A", "word", "is", "a", "word"], 
    getItems: function () { return this.items; },
    map: function (key, value, context) { context.emit(value.toLowerCase(), 1); },
    newResult: function (key) { return { count: 0 }; },
    process: function (key, value, result) { result.count += value; }
};

simplemapreduce.runTask(task, function (err, result) { console.dir(result); });
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

