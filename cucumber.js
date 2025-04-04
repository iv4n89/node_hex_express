const common = [
    '--require-module ts-node/register'
];

const backend = [
    ...common,
    'tests/features/**/*.feature',
    '--require tests/features/step_definitions/**/*.steps.ts',
].join(' ');

module.exports = {
    backend,
};
