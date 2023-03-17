import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const helloRouter = router({
  greet: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ name }) => {
      return {
        greeting: `Hello ${input?.name ?? 'world'}!`,
      };
    })
});