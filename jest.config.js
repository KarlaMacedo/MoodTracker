// jest.config.js
export default {
  testPathIgnorePatterns: ["/node_modules/", "/examples"],
  testEnvironment: "node",
  setupFiles: ['./tests/setup.js'],
  transform: {},
};
