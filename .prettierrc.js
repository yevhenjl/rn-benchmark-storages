module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react(/[^\\/]+)?$',
    '^react-native(/[^\\/]+)?$',
    '<THIRD_PARTY_MODULES>',
    '^@(?!ui).*',
    '^@ui/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
