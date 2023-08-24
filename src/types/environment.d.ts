declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_S3_CLOUD_FRONT_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_URL: string;
      SECRET: string;

      // AWS S3
      S3_UPLOAD_REGION: string;
      // S3_UPLOAD_BUCKET=tv-guide-resource
      // S3_UPLOAD_KEY=AKIA2Y7YZNQ7P7W7QH7X
      // S3_UPLOAD_SECRET=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
      // NEXT_PUBLIC_S3_CLOUD_FRONT_URL=https://d1lmgnqw69ga6t.cloudfront.net
    }
  }
}

export {};
