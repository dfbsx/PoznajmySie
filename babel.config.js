module.exports = {
  presets: [
    '@babel/preset-env', // This preset is for ES6+ syntax
    '@babel/preset-typescript',
    '@babel/preset-react' // If you're using TypeScript
  ],
  plugins: [
    '@babel/plugin-syntax-jsx', // Add this plugin for parsing JSX syntax
  ]
};
