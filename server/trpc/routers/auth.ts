import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string()
      })
    )
    .mutation(({ input }) => {
      // TODO: Implement login
      // TODO: Decide on model of user data to return (change below)
      console.log(input?.email, input?.password);
      return {
        success: false,
        error: 'Not implemented'
      };
    })
});