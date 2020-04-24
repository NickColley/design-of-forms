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

// Similar usage with https://mozilla.github.io/nunjucks/templating.html#sort-arr-reverse-casesens-attr but for nested property access
// Based on https://github.com/mozilla/nunjucks/blob/2031bf2b1e28a0d477cefb263e36943176f946f7/nunjucks/src/filters.js#L436-L461
exports.sortNested = function sortNested (arr, reversed, caseSens, attr) {
    // Copy it
    let array = arr.map(v => v);

    array.sort((a, b) => {
        let x = getNestedPropertyValue(attr, a);
        let y = getNestedPropertyValue(attr, b);

        if (!caseSens && typeof x === 'string' && typeof y === 'string') {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        if (x < y) {
            return reversed ? 1 : -1;
        } else if (x > y) {
            return reversed ? -1 : 1;
        } else {
            return 0;
        }
    });

    return array;
}
