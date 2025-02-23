module.exports = {
    resolver: {
      sourceExts: ['js', 'jsx', 'ts', 'tsx'], // Добавьте другие расширения, если нужно
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };