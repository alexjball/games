/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // TODO: re-enable once use-resize-observer is fixed
  // https://github.com/ZeeCoder/use-resize-observer/issues/90
  reactStrictMode: false,
  eslint: {
    dirs: ["components", "game", "pages", "redux", "styles"],
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
}
