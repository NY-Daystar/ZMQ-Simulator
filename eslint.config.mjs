import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import ejs from 'eslint-plugin-ejs';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		extends: compat.extends('eslint:recommended'),
		ignores: ['**/dist/**'],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.commonjs,
			},
			parser: tsparser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		plugins: {
			'@typescript-eslint': tseslint,
			prettier: prettierPlugin,
			ejs,
		},

		rules: {
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
				},
			],

			'linebreak-style': ['error', 'windows'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'no-undef': 'off',
			'func-names': 'warn',
			'consistent-return': 'off',
			...tseslint.configs.recommended.rules,
			...prettierConfig.rules,
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-console': 'warn',
			'prettier/prettier': 'error',
		},
	},
]);
