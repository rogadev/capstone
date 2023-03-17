import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { helloRouter } from './hello';
import { testRouter } from './testing';

export const appRouter = router({
  hello: helloRouter,
  test: testRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
