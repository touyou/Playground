const path = require('path');

const serverless = process.env.ENV_SERVELESS;
const configServeless = serverless ? { target: serverless } : {};

module.exports = {
  ...configServeless,
  dir: './',
  webpack(config, options) {
    const { dev, isServer } = options
    if (!dev) {
      config.devtool = 'source-map'
    }
    config.resolve.alias.components = path.join(__dirname, 'components')
    config.resolve.alias.static = path.join(__dirname, 'static')
    config.resolve.mainFields = isServer ? ['browser', 'main', 'module'] : ['main', 'module']
    config.resolve.extensions = [
      '.ts',
      '.tsx',
      '.mjs',
      '.js',
      '.jsx',
      '.css',
      '.png',
      '.jpg',
      '.gif',
      '.jpeg'
    ]
    return config
  }
};
