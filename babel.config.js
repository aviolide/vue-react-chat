module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        modules: 'commonjs',
        targets: {
          node: '10'
        }
      }
    ],
    '@babel/typescript',
    '@babel/react'
  ];
  const plugins = [
    'transform-typescript-metadata',
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
    '@babel/proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    '@babel/transform-flow-strip-types',
    '@babel/syntax-flow',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          api: './src/utils/api',
          utils: './src/utils',
          modules: './src/modules',
          site: './src/modules/site'
        }
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
