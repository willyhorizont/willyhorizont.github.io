(function (root, factory) {
    if ((typeof module === "object") && module.exports) {
        // Node.js
        module.exports = factory();
    } else {
        // Browser
        root.WillyHorizont = factory(root);
    }
})(((typeof globalThis !== "undefined") ? globalThis : this), function (root) {
    const hi = () => console.log("Hi!");

    return {
        hi,
    };
});
