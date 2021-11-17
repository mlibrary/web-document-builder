module.exports = function(eleventyConfig) {
  // Output directory: _site

  // Find and copy any `jpg` files in any folder to _site/img
  // Does not keep the same directory structure.
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("web-document.css");
};
