function getNestedPropertyValue (selector, originalObject) {
    let keys = selector.split('.');
    let value = keys.reduce((object, key) => object[key], originalObject);
    return value;
}

// From https://github.com/mozilla/nunjucks/issues/1198#issuecomment-610494129
exports.groupByNested = function groupByNested (arr, key) {
    const result = {};
    arr.forEach(item => {
        const value = getNestedPropertyValue(key, item);

        (result[value] || (result[value] = [])).push(item);
    });
    return result;
}
