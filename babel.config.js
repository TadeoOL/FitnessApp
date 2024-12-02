const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'),
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
