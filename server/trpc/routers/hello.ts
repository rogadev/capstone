import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const helloRouter = router({
  greet: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}!`,
      };
    }),
});