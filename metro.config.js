module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve(
      '@dynatrace/react-native-plugin/lib/dynatrace-transformer',
    ),
  },
  // eslint-disable-next-line global-require
  reporter: require('@dynatrace/react-native-plugin/lib/dynatrace-reporter'),
};
