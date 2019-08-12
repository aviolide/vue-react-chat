module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        modules: 'commonjs',
        targets: {
          chrome: '74'
        }
      }
    ],
    '@babel/typescript'
  ];
  const plugins = [
    'transform-typescript-metadata',
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
    '@babel/proposal-object-rest-spread',
    '@babel/transform-flow-strip-types',
    '@babel/syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          site: './src',
          // constants: '../constants',
          // 'api-client': '../utils/api-client',
          // utils: '../utils',
          // src: '../api/src'
        }
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
