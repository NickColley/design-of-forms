const cheerio = require('cheerio');
// Make figures work better
// https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html
module.exports = function semanticFigures (content, outputPath) {
    if(outputPath.endsWith(".html")) {
        const $ = cheerio.load(content);
        const $main = $('main');
        $main.find('figure').each(function () {
            const $figure = $(this);
            const $caption = $figure.find('figcaption');
            $figure.attr('role', 'figure');
            $figure.attr('aria-label', $caption.text().trim());
        })
        content = $.html();
    }
    return content;
}
