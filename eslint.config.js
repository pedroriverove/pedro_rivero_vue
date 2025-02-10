import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
    js.configs.recommended,
    {
        ignores: ['node_modules', 'dist', 'public'],
        files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 2020,
                sourceType: 'module'
            },
            globals: {
                console: 'readonly',
                window: 'readonly',
                document: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                globalThis: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': ts,
            vue: vue,
            prettier: prettier
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: false
                }
            ],
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'no-console': 'off',
            'no-undef': 'off',
            'no-debugger': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
        }
    }
]
