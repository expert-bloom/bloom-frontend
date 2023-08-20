declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_S3_CLOUD_FRONT_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_URL: string;
      SECRET: string;
    }
  }
}

export {};
