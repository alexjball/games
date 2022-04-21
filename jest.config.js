module.exports = {
  roots: ["<rootDir>/game"],
  testMatch: ["**/?(*.)+(test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
