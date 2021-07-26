module.exports = {
  roots: ["<rootDir>/game", "<rootDir>/redux"],
  testMatch: ["**/?(*.)+(test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
