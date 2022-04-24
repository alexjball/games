module.exports = {
  stories: [
    "../components/**/*.stories.@(ts|tsx)",
    "../pages/**/*.stories.@(ts|tsx)",
  ],
  addons: ["storybook-addon-next", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
}
