export default {
    testMatch: [
        '**/__tests__/**/*.e2e.spec.(ts|js)'
    ],
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'js'],

    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { diagnostics: false }]
    },
    moduleNameMapper: {
        '^app$': '<rootDir>/dist/app'
    }
};