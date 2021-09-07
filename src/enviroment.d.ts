declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_SECRET: string;
      PRISMA_SECRET: string;
      URL_BASE: string;
      ENVIROMENT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
