const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#2d8ceb" },
  })(config, env);
  config = rewireCssModules(config, env);
  return config;
};
