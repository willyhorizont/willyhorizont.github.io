(() => {
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment may also support Web Browser environment module script (script with type="module") and Node.js ES Module (ESM) environment
        module.exports = {
            Utils: require("./utils.js"),
            UtilsDate: require("./utils-date.js"),
            UtilsZyx: require("./utils-zyx.js"),
        };
        return;
    }
    // Unknown / unsupported environment
})();
