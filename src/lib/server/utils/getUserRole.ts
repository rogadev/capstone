import { prismaClient } from "$lib/server/prisma";

type User = {
  username: string;
  id: string;
};

const getRole = async (user: User) => {
  const { username } = user;
  console.log('getRole', username);
  let data = null;
  try {
    data = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        Role: true,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error('User not found');
  }
  if (!data) throw new Error('User not found');
  return data.Role;
};

export default getRole;