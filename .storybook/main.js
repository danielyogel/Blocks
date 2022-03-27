module.exports = {
  stories: ['../**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  typescript: { check: true },
  core: { builder: 'storybook-builder-vite' }
};
