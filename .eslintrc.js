module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    plugins: ['vue'],
    extends: ['plugin:vue/vue3-recommended'],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
    },
};
