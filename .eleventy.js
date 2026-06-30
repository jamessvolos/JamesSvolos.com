module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false); // generated page templates are git-ignored but must still build
  ["favicon.png", "CNAME", ".nojekyll", "robots.txt",
   "llms.txt", "llms-full.txt", "assets", "about", "connect"]
    .forEach((p) => eleventyConfig.addPassthroughCopy(p));
  return { dir: { input: "src", output: "_site", includes: "_includes" } };
};
