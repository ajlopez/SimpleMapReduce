
'use strict';

var simplemapreduce = (function () {
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
        runSync: runSync
    }
})();

if (typeof window === 'undefined') {
	module.exports = simplemapreduce;
}
