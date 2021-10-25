module.exports = {
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: false,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup/"],
};
