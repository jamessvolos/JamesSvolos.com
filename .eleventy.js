module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false); // generated src/*.njk are git-ignored but must still build
  ["favicon.png", "CNAME", ".nojekyll", "robots.txt", "sitemap.xml",
   "llms.txt", "llms-full.txt", "assets", "about", "connect"]
    .forEach((p) => eleventyConfig.addPassthroughCopy(p));
  return { dir: { input: "src", output: "_site", includes: "_includes" } };
};
