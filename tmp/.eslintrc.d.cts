export declare const root: boolean;
export declare namespace env {
    const browser: boolean;
    const es2021: boolean;
    const node: boolean;
}
declare const _extends: string[];
export { _extends as extends };
export declare const parser: string;
export declare namespace parserOptions {
    const tsconfigRootDir: string;
    const project: string[];
    const ecmaVersion: number;
    const sourceType: string;
    namespace ecmaFeatures {
        const jsx: boolean;
    }
}
export declare const plugins: string[];
export declare const rules: {
    '@typescript-eslint/no-explicit-any': string;
    '@typescript-eslint/explicit-module-boundary-types': string;
    '@typescript-eslint/no-inferrable-types': string;
    '@typescript-eslint/no-non-null-assertion': string;
    '@typescript-eslint/no-empty-interface': string;
    '@typescript-eslint/no-namespace': string;
    '@typescript-eslint/no-empty-function': string;
    '@typescript-eslint/no-this-alias': string;
    '@typescript-eslint/ban-types': string;
    '@typescript-eslint/ban-ts-comment': string;
    'prefer-spread': string;
    'no-case-declarations': string;
    'no-console': string;
    '@typescript-eslint/no-unused-vars': string[];
};
