import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

// Docs on middleware and other features of TRPC
// https://trpc.io/docs/middlewares
export const middleware = t.middleware();
export const router = t.router();
export const procedure = t.procedure();

// Currently not implementing middleware, but an example (link above) is:
// interface Context {
//   user?: {
//     id: string;
//     isAdmin: boolean;
//     // [..]
//   };
// }

// const t = initTRPC.context<Context>().create();
// export const middleware = t.middleware;
// export const publicProcedure = t.procedure;
// export const router = t.router;
 
// const isAdmin = middleware(async ({ ctx, next }) => {
//   if (!ctx.user?.isAdmin) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }
//   return next({
//     ctx: {
//       user: ctx.user,
//     },
//   });
// });
 
// export const adminProcedure = publicProcedure.use(isAdmin);