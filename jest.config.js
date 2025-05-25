export default {
  preset: 'ts-jest/presets/default-esm',           // ESM preset
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,                                // compile TS → ESM
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',                  // strip .js extensions in imports
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],      // your test files
  setupFilesAfterEnv: [],                           // e.g. for global mocks
};
