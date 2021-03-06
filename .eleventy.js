const esbuild = require('esbuild');
const path = require('path');
const PluginFootnotes = require('eleventy-plugin-footnotes');
const {
  asideShortcode,
  imageShortcode,
  iconShortcode,
  quoteShortcode,
  thumbnailShortcode,
} = require('./config/shortcodes');
const {
  wordCount,
  limit,
  sortByKey,
  toHtml,
  where,
  toISOString,
  toLocaleDateReadableString,
  dividedBy,
  newlineToBr,
  toAbsoluteUrl,
  stripNewlines,
  stripHtml,
  getLatestCollectionItemDate,
  compileAndMinifyScss,
} = require('./config/filters');
const {
  getAllPosts,
  getAllUniqueCategories,
  getPostsByCategory,
  getPopularCategories,
  getCategoriesWithDescendingCount,
} = require('./config/collections');
const markdownLib = require('./config/plugins/markdown');
const { dir, imagePaths, scriptDirs } = require('./config/constants');
const { slugifyString } = require('./config/utils');
const { escape } = require('lodash');

const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  eleventyConfig.setLiquidOptions({
    // Allows for dynamic include/partial names. If true, include names must be quoted. Defaults to true as of beta/1.0.
    dynamicPartials: false,
  });

  // Watch targets
  eleventyConfig.addWatchTarget(imagePaths.source);
  eleventyConfig.addWatchTarget(scriptDirs.source);

  // Pass-through copy for static assets
  eleventyConfig.addPassthroughCopy(`${dir.input}/${dir.assets}/fonts`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/404`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/favicons`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/posts`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/logo.svg`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/profile-photo.jpg`);

  // Custom shortcodes
  eleventyConfig.addPairedShortcode('aside', asideShortcode);
  eleventyConfig.addPairedShortcode('quote', quoteShortcode);
  eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addShortcode('icon', iconShortcode);
  eleventyConfig.addShortcode('thumbnail', thumbnailShortcode);

  // Custom filters
  eleventyConfig.addFilter('wordCount', wordCount);
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addFilter('sortByKey', sortByKey);
  eleventyConfig.addFilter('where', where);
  eleventyConfig.addFilter('escape', escape);
  eleventyConfig.addFilter('toHtml', toHtml);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('toLocaleDateReadableString', toLocaleDateReadableString);
  eleventyConfig.addFilter('dividedBy', dividedBy);
  eleventyConfig.addFilter('newlineToBr', newlineToBr);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripNewlines', stripNewlines);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slug', slugifyString);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('getLatestCollectionItemDate', getLatestCollectionItemDate);
  eleventyConfig.addFilter('compileAndMinifyScss', compileAndMinifyScss);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // Custom collections
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('categories', getAllUniqueCategories);
  eleventyConfig.addCollection('postsByCategory', getPostsByCategory);
  eleventyConfig.addCollection('categoriesWithCount', getCategoriesWithDescendingCount);
  eleventyConfig.addCollection('popularCategories', getPopularCategories({ limit: 10, minCount: 5 }));

  // Plugins
  eleventyConfig.addPlugin(PluginFootnotes, {
    baseClass: 'footnotes',
    classes: {
      list: 'list',
    },
    title: 'Footnotes',
    titleId: 'footnotes-label',
    backLinkLabel: (footnote, index) => `Back to reference ${index + 1}`,
  });
  eleventyConfig.setLibrary('md', markdownLib);

  // Post-processing
  eleventyConfig.on('afterBuild', () => {
    return esbuild.build({
      entryPoints: [path.join(scriptDirs.source, 'index.mjs')],
      entryNames: '[dir]/[name]',
      outdir: scriptDirs.output,
      format: 'esm',
      outExtension: { '.js': '.mjs' },
      bundle: true,
      splitting: true,
      minify: true,
      sourcemap: process.env.ELEVENTY_ENV !== 'production',
    });
  });

  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
  };
};
