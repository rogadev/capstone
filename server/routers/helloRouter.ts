import { z } from 'zod';
import { router, procedure } from '../trpc';

export const helloRouter = router({
  hello: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ name }) => {
      return {
        greeting; `Hello ${input?.name ?? 'world'}!`,
      }
    })
})