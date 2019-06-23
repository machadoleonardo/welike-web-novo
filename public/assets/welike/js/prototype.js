Array.prototype.forEachSync = async function (fn) {
    for (let t of this) { await fn(t) }
};