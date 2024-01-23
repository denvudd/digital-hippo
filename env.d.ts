namespace NodeJS {
  interface ProcessEnv {
    PAYLOAD_SECRET: string;
    MONGODB_URL: string;
    NEXT_PUBLIC_SERVER_URL: string;
    RESEND_API_KEY: string;
    STRIPE_SECRET_KEY: string;
    NEXT_BUILD: string;
    STRIPE_WEBHOOK_SECRET: string;
  }
}
