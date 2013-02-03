
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

    function MapResultContext(keyresults, newresultfn, processfn) {
        this.emit = function(key, value) {
            var result = keyresults[key];
            if (!result)
                result = keyresults[key] = newresultfn(key);
            processfn(key, value, result);
        }
    };

    function ReduceContext(keyvalues) {
        this.emit = function(key, value) {
            keyvalues[key] = value;
        }
    };

    function run(items, mapfn, newfn, processfn, callback) {
        try {
            var result = runSync(items, mapfn, newfn, processfn, callback);
        }
        catch (err) {
            callback(err);
            return;
        }

        callback(null, result);
    }

    function runSync(items, mapfn, newfn, processfn) {
        var map = { };
        var mapctx = new MapResultContext(map, newfn, processfn);

        items.forEach(function (value, key) {
            mapfn(key, value, mapctx);
        });

        return map;
    }

    function runTaskSync(task) {
        var items = task.getItems();
        return runSync(items, task.map, task.newResult, task.process);
    }

    function runTask(task, callback) {
        var items = task.getItems();
        run(items, task.map, task.newResult, task.process, callback);
    }

    function mapReduceSync(items, map, reduce) {
        var keyvalues = { };
        var result = { };

        var mapctx = new MapContext(keyvalues);

        items.forEach(function(value, key) {
            map(key, value, mapctx);
        });

        var redctx = new ReduceContext(result);

        for (var key in keyvalues) {
            var values = keyvalues[key];
            reduce(key, values, redctx);
        }

        return result;
    };

    function mapReduce(items, map, reduce, callback) {
        var keyvalues = { };
        var keys = [];
        var result = { };
        var redctx = new ReduceContext(result);

        try {
            var itemkeys = Object.keys(items);
            var nkeys = itemkeys.length;
            var nkey = 0;
            var mapctx = new MapContext(keyvalues);

            doMap();
        }
        catch (err) {
            doError(err);
        }
        
        function doError(err) {
            if (callback)
                callback(err);
            else
                console.log(err);
        }

        function doMap() {
            try {
                if (nkey >= nkeys)
                    return doReduce();

                var key = itemkeys[nkey++];
                var value = items[key];

                map(key, value, mapctx, doMap);
            }
            catch (err) {
                doError(err);
            }
        }

        function doReduce() {
            try {
                for (var key in keyvalues)
                    keys.push(key);

                doReduceKey();
            }
            catch (err) {
                doError(err);
            }
        }

        function doReduceKey() {
            try {
                if (!keys.length)
                    return callback(null, result);
                var key = keys.shift();
                var values = keyvalues[key];
                reduce(key, values, redctx, doReduceKey);
            }
            catch (err) {
                doError(err);
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
