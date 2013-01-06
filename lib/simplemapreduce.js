
'use strict';

var simplemapreduce = (function () {
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

    return {
        run: run,
        runSync: runSync,
        runTaskSync: runTaskSync,
        runTask: runTask
    }
})();

if (typeof window === 'undefined') {
	module.exports = simplemapreduce;
}
