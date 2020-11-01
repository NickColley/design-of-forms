const cheerio = require("cheerio");
// Add CSS Custom Property to any lists the start above 1. so
// we can style a custom bullet number.
module.exports = function counterStartLists(content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    const $ = cheerio.load(content);
    const $main = $("main");
    const $lists = $main.find("ol[start],ul[start]");
    $lists.each(function () {
      const $list = $(this);
      const startNumber = $list.attr("start");
      $list.css("--counter-start", parseInt(startNumber, 10) - 1);
    });
    content = $.html();
  }
  return content;
};
