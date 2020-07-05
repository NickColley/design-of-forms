const markdown = require("markdown-it");
const imageLazyLoading = require('markdown-it-image-lazy-loading');

const options = {
    html: true
}

module.exports = markdown(options)
                    .use(imageLazyLoading);
