// src/types/xss-clean.d.ts

/**
 * Minimal ambient module declaration for `xss-clean`
 * as it has no published @types.
 */
declare module 'xss-clean' {
  import { RequestHandler } from 'express';
  const xssClean: () => RequestHandler;
  export default xssClean;
}
