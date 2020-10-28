const sortedPages = require("./sorted-pages.js");

module.exports = function (markdown) {
  return function gallery(collectionApi) {
    return sortedPages(collectionApi).flatMap((page) => {
      const markdownContent = page.template.inputContent.replace(
        /{{ page\.url }}/g,
        ""
      );
      const filePath = page.data.page.filePathStem.replace("/index", "/");
      return (
        markdown
          .parseInline(markdownContent, {})
          .filter((token) => token.type === "inline")
          .flatMap((token) => token.children)
          .filter((token) => token.type === "image")
          .map((token) => {
            const src = token.attrs.find((attr) => attr[0] === "src")[1];
            return {
              page: {
                section: page.data.section,
                title: page.data.title,
              },
              href: filePath + src.replace(/(.+)\.jpg/g, "#image-$1"),
              alt: token.content,
              src: filePath + src,
            };
          })
          // Unique images only
          .filter((image, index, originalImages) => {
            return (
              originalImages
                .map((originalImage) => originalImage.src)
                .indexOf(image.src) === index
            );
          })
      );
    });
  };
};
