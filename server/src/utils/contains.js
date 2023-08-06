module.exports = function (target, pattern) {
    var value = 0;
    pattern.forEach(function (word) {
        if (!target.includes(word)) value++;
    });
    return !(value > 0);
};