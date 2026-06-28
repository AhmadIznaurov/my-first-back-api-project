
export default {
    // Указываем, какие файлы Jest должен считать тестами
    testMatch: [
        '**/__tests__/**/*.e2e.spec.(ts|js)' // Исправлен путь поиска тестов
    ],

    // Используем готовый пресет для TypeScript
    preset: 'ts-jest',

    // Говорим Jest, что у нас есть файлы с расширениями .ts и .js
    moduleFileExtensions: ['ts', 'js'],


    // --- ИСПРАВЛЕННАЯ ЧАСТЬ ---
    // Здесь мы настраиваем ts-jest. Это заменяет устаревший блок "globals".
    transform: {
        // Эта регулярка говорит: "Любой файл, заканчивающийся на .ts или .tsx,
        // обрабатывай через трансформер 'ts-jest'"
        '^.+\\.(ts|tsx)$': ['ts-jest', { diagnostics: false }]
    },
    moduleNameMapper: {
        '^app$': '<rootDir>/dist/app'
    }
};