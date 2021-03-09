module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '^2.6.12',
        targets: { node: 'current' },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@babel/plugin-transform-runtime',

      {
        regenerator: true,
      },
    ],
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true,
      },
    ],
  ],
};
