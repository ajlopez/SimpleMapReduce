
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
            if (processfn)
                processfn(key, value, result);
        }
    };

    function ReduceContext(keyvalues) {
        this.emit = function(key, value) {
            keyvalues[key] = value;
        }
    };

    function run(items, mapfn, newfn, processfn, callback) {
        var callbackinvoked = false;
        var results = { };

        try {
            var itemkeys = Object.keys(items);
            var nkeys = itemkeys.length;
            var nkey = 0;

            doMap();
        }
        catch (err) {
            doError(err);
        }

        function doMap() {
            try {
                if (nkey >= nkeys) {
                    callbackinvoked = true;
                    callback(null, results);
                    return;
                }

                var key = itemkeys[nkey++];
                var value = items[key];
                var keyvalues = { };
                var mapctx = new MapContext(keyvalues);

                mapfn(key, value, mapctx, function () { doProcess(keyvalues, doMap); });
            }
            catch (err) {
                doError(err);
            }
        }
        
        function doProcess(keyvalues, next) {
            function doKeyValue() {
                if (nvalue >= nvalues) {
                    next();
                    return;
                }
                
                var value = values[nvalue++];
                
                processfn(key, value, result, doKeyValue);
            }
            
            for (var key in keyvalues) {
                var result = results[key];

                if (!result)
                    result = results[key] = newfn(key);

                var values = keyvalues[key];
                var nvalues = values.length;
                var nvalue = 0;

                doKeyValue();
            }
        }

        function doError(err) {
            if (callbackinvoked)
                throw err;

            if (callback)
                callback(err);
            else
                console.log(err);
        }
    }

    function runSync(items, mapfn, newfn, processfn) {
        var results = { };
        var mapctx = new MapResultContext(results, newfn, processfn);

        items.forEach(function (value, key) {
            mapfn(key, value, mapctx);
        });

        return results;
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
        var callbackinvoked = false;
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
            if (callbackinvoked)
                throw err;

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
                if (!keys.length) {
                    callbackinvoked = true;
                    callback(null, result);
                    return;
                }
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
