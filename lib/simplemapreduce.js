
'use strict';

var simplemapreduce = (function () {
    function run(items, mapfn, newfn, processfn, callback) {
        var result = this.runSync(items, mapfn, newfn, processfn, callback);
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

    return {
        run: run,
        runSync: runSync
    }
})();

if (typeof window === 'undefined') {
	module.exports = simplemapreduce;
}
