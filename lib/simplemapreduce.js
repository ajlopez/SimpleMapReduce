
'use strict';

var simplemapreduce = (function () {
    function MapContext(keyvalues) {
        this.emit = function(key, value) {
            var values = keyvalues[key];
            if (!values)
                values = keyvalues[key] = [];
            values.push(value);
        }
    };

    function ReduceContext(keyvalues) {
        this.emit = function(key, value) {
            keyvalues[key] = value;
        }
    };

    function run(items, mapfn, newfn, processfn, callback) {
        var result = runSync(items, mapfn, newfn, processfn, callback);
        callback(result);
    }

    function runSync(items, mapfn, newfn, processfn) {
        var map = { };

        items.forEach(function (item) {
            var key = mapfn(item);
            var result = map[key];
            if (!result)
                result = map[key] = newfn(item, key);
            processfn(item, result);
        });

        return map;
    }

    function runTaskSync(task) {
        var items = task.getItems();
        return runSync(items, task.getKey, task.getResult, task.processItem);
    }

    function runTask(task, callback) {
        var items = task.getItems();
        run(items, task.getKey, task.getResult, task.processItem, callback);
    }

    function mapReduceSync(items, map, reduce) {
        var keyvalues = { };
        var result = { };

        var mapctx = new MapContext(keyvalues);

        items.forEach(function(item) {
            map(item, mapctx);
        });

        var redctx = new ReduceContext(result);

        for (var key in keyvalues) {
            var values = keyvalues[key];
            reduce(key, values, redctx);
        }

        return result;
    };

    function mapReduce(items, map, reduce, callback) {
        var itemkeys = Object.keys(items);
        var nkeys = itemkeys.length;
        var nkey = 0;
        var keyvalues = { };

        var mapctx = new MapContext(keyvalues);

        doMap();

        function doMap() {
            if (nkey >= nkeys)
                return doReduce();

            var key = itemkeys[nkey++];
            var value = items[key];

            map(key, value, mapctx, doMap);
        }

        function doReduce() {
            var keys = [];
            var result = { };
            var redctx = new ReduceContext(result);

            for (var key in keyvalues)
                keys.push(key);

            doReduceKey();

            function doReduceKey() {
                if (!keys.length)
                    return callback(result);
                var key = keys.shift();
                var values = keyvalues[key];
                reduce(key, values, redctx, doReduceKey);
            }
        }
    };

    return {
        run: run,
        runSync: runSync,
        runTaskSync: runTaskSync,
        runTask: runTask,
        mapReduceSync: mapReduceSync,
        mapReduce: mapReduce
    }
})();

if (typeof window === 'undefined') {
	module.exports = simplemapreduce;
}
