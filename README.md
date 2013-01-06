# SimpleMapReduce

Simple MapReduce implementation, written in JavaScript. WIP.

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

Run
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

TBD
## Development

```
git clone git://github.com/ajlopez/SimpleMapReduce.git
cd SimpleMapReduce
npm install
npm test
```

## Samples

TBD

## To do

- Samples

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleMapReduce) and submit
[pull requests](https://github.com/ajlopez/SimpleMapReduce/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

