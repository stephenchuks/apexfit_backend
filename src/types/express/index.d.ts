import * as express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    /**
     * Populated by authGuard middleware after verifying JWT.
     */
    user?: {
      userId: string;
      role: string;
    };
  }
}
