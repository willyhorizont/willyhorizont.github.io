((root, factory) => {
    if ((typeof window !== "undefined") && (typeof document !== "undefined")) {
        // Web Browser environment
        root.WillyHorizont = factory(root);
        return;
    }
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment
        module.exports = factory(root);
        return;
    }
    // Unknown / unsupported environment
})(globalThis, (root) => {
    const initializeApp = () => console.log("Hi!");

    return {
        initializeApp,
    };
});
