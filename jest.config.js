module.exports = {
  roots: ["<rootDir>/lib"],
  testMatch: ["**/?(*.)+(test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
