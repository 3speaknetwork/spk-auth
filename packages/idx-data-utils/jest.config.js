module.exports = {
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      coveragePathIgnorePatterns: ['node_modules', 'exceptions.ts'],
      collectCoverage: true,
      collectCoverageFrom: ['src/**/*.ts'],
      testEnvironment: '<rootDir>/test/env/jest-node-env.ts',
    },
    //     {
    //       displayName: 'browser',
    //       preset: 'ts-jest',
    //       collectCoverageFrom: ['src/**/*.ts'],
    //       testEnvironment: '<rootDir>/test/env/jest-browser-env.ts',
    //       collectCoverage: false,
    //     },
  ],
}
