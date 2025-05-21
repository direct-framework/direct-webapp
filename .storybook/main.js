

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../node/stories/**/*.mdx",
    "../node/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  }
};
export default config;
