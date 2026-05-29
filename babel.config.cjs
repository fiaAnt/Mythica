module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@/assets/(.+)': './assets/\\1',
          '^@/(.+)': './src/\\1',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.ts', '.tsx'],
        cwd: 'babelrc',
      },
    ],
  ],
}
