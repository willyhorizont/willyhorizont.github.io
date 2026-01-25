(function (root, factory) {
    if ((typeof module === "object") && module.exports) {
        // Node.js
        module.exports = factory();
    } else {
        // Browser
        root.WillyHorizont = factory();
    }
})(((typeof globalThis !== "undefined") ? globalThis : this), function () {
    const hi = () => ("Hi!");

    return {
        hi,
    };
});
