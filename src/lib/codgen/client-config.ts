import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/**/schema.graphql',
  documents: ['src/graphql/client/operations/**/*.{gql,graphql}'],
  generates: {
    'src/graphql/client/gql/schema.ts': {
      // 'src/graphql/client/gql/': {
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        useImplementingTypes: true, // enumsAsTypes: true,
        useTypeImports: true,
        avoidOptionals: true,
        skipTypename: true,
        nonOptionalTypename: false,

        // avoid the __typename prop
      },
    },
  },
};

export default config;
