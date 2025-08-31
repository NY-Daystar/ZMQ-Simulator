export default {
	preset: 'ts-jest',
	moduleFileExtensions: ['js', 'ts'],
	testMatch: ['**/*.test.(ts|js)'],
	testEnvironment: 'node',
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	restoreMocks: true,
	coveragePathIgnorePatterns: ['node_modules', 'dist', 'src/config'],
	coverageReporters: ['text', 'lcov', 'clover', 'html'],

	// tsconfig file only for jest
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
};
