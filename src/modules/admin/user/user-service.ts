import { hashPassword } from "../../../core/utils/hash";

export const createUser = async (
  username: string,
  password: string,
  isAdmin: boolean,
) => {
  const user = await prisma.user.findUnique({ where: { username: username } });

  if (user) {
    throw new Error("Username already exists");
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      passwordHash: await hashPassword(password),
      isAdmin: isAdmin,
    },
  });

  const { passwordHash, ...data } = newUser;
  return data;
};
