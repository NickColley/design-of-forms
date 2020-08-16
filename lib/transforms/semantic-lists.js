const cheerio = require('cheerio');
// Make sure styled lists keep their correct semantics.
// https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
module.export = function semanticLists (content, outputPath) {
    if(outputPath.endsWith(".html")) {
        const $ = cheerio.load(content);
        const $main = $('main');
        $main.find('ol,ul').attr('role', 'list');
        $main.find('li').attr('role', 'listitem');
        content = $.html();
    }
    return content;
}
