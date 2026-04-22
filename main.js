(function (root, factory) {
    if ((typeof module === "object") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js
        module.exports = factory(root);
    } else {
        // Web Browser
        root.WillyHorizont = factory(root);
    }
})(((typeof globalThis !== "undefined") ? globalThis : this), function (root) {
    const initializeApp = () => console.log("Hi!");

    return {
        initializeApp,
    };
});
