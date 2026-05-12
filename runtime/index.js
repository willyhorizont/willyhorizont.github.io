(() => {
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment may also support Web Browser environment module script (script with type="module") and Node.js ES Module (ESM) environment
        const Utils = require("./utils.js");
        const UtilsDate = require("./utils-date.js");
        const UtilsZyx = require("./utils-zyx.js");
        module.exports = {
            Utils,
            UtilsDate,
            UtilsZyx,
        };
        return;
    }
    // Unknown / unsupported environment
})();
