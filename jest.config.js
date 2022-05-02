const nextJest = require("next/jest")
const createJestConfig = nextJest({ dir: "./" })

const customJestConfig = {
  moduleDirectories: ["node_modules"],
  testEnvironment: "jest-environment-jsdom",
}

const config = createJestConfig(customJestConfig)

module.exports = async () => {
  const c = await config()
  // console.log(JSON.stringify(c, null, 2))
  return c
}
