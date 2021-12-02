module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        // https://webpack.docschina.org/configuration/resolve/#resolveextensions
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
          '.tsx',
          '.jsx',
          '.ts',
          '.ios.ts',
          '.android.ts',
        ],
        alias: {
          utils: './utils',
          services: './services',
          components: './components',
        },
      },
    ],
  ],
};
