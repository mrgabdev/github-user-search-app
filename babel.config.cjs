module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        [
          'babel-preset-vite',
          {
            env: true,
            glob: false,
          },
        ],
      ],
    },
  },
}
