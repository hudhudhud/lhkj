module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/newadmin/' : '/',

  pwa: {
    name: 'newadmin'
  },

  lintOnSave: process.env.NODE_ENV !== 'production'
};
