import { prismaClient } from "$lib/server/prisma";
import { UserRole } from "@prisma/client";

const authorizeAdmin = async (locals) => {
  const { session, user } = await locals.validateUser();
  user.role = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
    select: {
      Role: true,
    },
  });
  if (!session) throw new Error('Unauthorized'); // session expired
  if (!user.role || (!user.role === UserRole.Admin || !user.role === UserRole.SuperAdmin))
    throw new Error('Unauthorized'); // user is not admin
  console.info('Authorized admin API request:');
  console.info('  Username:', user.username);
  console.info('  Role:', user.role.Role);
};

export default authorizeAdmin;