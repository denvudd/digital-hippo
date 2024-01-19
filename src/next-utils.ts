import next from "next";

const port = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port,
});

export const nextHandler = nextApp.getRequestHandler();
