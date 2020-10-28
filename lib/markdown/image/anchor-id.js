const imageCount = {};
module.exports = function anchorId(markdown) {
  var defaultRenderer = markdown.renderer.rules.image;
  markdown.renderer.rules.image = function (tokens, index, options, env, self) {
    var token = tokens[index];
    const imageSource = token.attrGet("src");
    // Since we can have the same image twice on a page,
    // count the amount of times it's used and add a suffix if needed.
    if (!imageCount[imageSource]) {
      imageCount[imageSource] = 1;
    } else {
      imageCount[imageSource]++;
    }
    const idSuffix =
      imageCount[imageSource] > 1 ? "-" + imageCount[imageSource] : "";
    token.attrSet(
      "id",
      "image" + imageSource.replace(/.*\/(.+)\.jpg/g, "$1") + idSuffix
    );
    return defaultRenderer(tokens, index, options, env, self);
  };
};
