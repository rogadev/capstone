import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  one: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      console.log('Testing one', input.text);
      return {
        result: `Testing: ${input.text}`,
      };
    }),
});