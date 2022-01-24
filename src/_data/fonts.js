const path = require('path');
const fontPath = `/assets/fonts`;

const FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic',
};

const FontDisplay = {
  SWAP: 'swap',
};

const FontVariant = {
  Light: 'Light',
  Regular: 'Regular',
  Medium: 'Medium',
  Bold: 'Bold',
  Italic: 'Italic',
  BoldItalic: 'Bold Italic',
};

/** Helper to auto-prefix a font src url with the path to local fonts. */
const getFontUrl = (src) => path.join(fontPath, src);

/** Global font config. Gets compiled into font face declarations and can be reused anywhere to access font info. */
const fonts = {
  title: {
    family: 'arial',
    fallbacks: [`sans-serif`],
    weights: {
      regular: {
        variant: FontVariant.Regular,
        weight: 400,
        style: FontStyle.NORMAL,
        display: FontDisplay.SWAP,
      },
      bold: {
        variant: FontVariant.Bold,
        weight: 900,
        style: FontStyle.NORMAL,
        display: FontDisplay.SWAP,
      },
    },
  },
  code: {
    family: 'IBM Plex Mono',
    fallbacks: [`Monaco`, `Consolas`, `Courier New`, `monospace`],
    weights: {
      regular: {
        variant: FontVariant.Regular,
        weight: 400,
        style: FontStyle.NORMAL,
        url: getFontUrl('ibm-plex-mono-v7-latin-regular.woff2'),
        display: FontDisplay.SWAP,
      },
      medium: {
        variant: FontVariant.Medium,
        weight: 500,
        style: FontStyle.NORMAL,
        url: getFontUrl('ibm-plex-mono-v7-latin-500.woff2'),
        display: FontDisplay.SWAP,
      },
      bold: {
        variant: FontVariant.Bold,
        weight: 700,
        style: FontStyle.NORMAL,
        url: getFontUrl('ibm-plex-mono-v7-latin-700.woff2'),
        display: FontDisplay.SWAP,
      },
    },
  },
};

module.exports = fonts;
