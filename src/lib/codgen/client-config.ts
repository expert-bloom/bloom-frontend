import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/**/schema.graphql',
  documents: ['src/graphql/client/operations/**/*.{gql,graphql}'],
  generates: {
    'src/graphql/client/gql/schema.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        useImplementingTypes: true, // enumsAsTypes: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
