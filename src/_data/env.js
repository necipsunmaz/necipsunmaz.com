const { ELEVENTY_ENV } = process.env;

const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:4001',
    isProd: false,
  },
  production: {
    url: 'https://necipsunmaz.com',
    isProd: true,
  },
};

module.exports = {
  title: 'Necip Sunmaz',
  author: 'Necip Sunmaz',
  email: 'sunmaznecip@gmail.com',
  url: 'https://necipsunmaz.com',
  isProd: false,
  description:
    'Necip Sunmaz kişisel blog sitesidir. Yazılım geliştirme üzerine ve ara sıra konu dışı gönderiler yer alır.',
  issues: {
    owner: `necipsunmaz`,
    repo: `necipsunmaz.com`,
  },
  tracking: {
    gtag: 'G-XDB0GXV5PD',
  },
  pagination: {
    itemsPerPage: 20,
  },
  ...environmentSpecificVariables[ELEVENTY_ENV],
};
