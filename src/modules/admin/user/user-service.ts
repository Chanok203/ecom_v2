import { hashPassword } from "../../../core/utils/hash";
import { Role } from "../../../generated/prisma/enums";

export const createUser = async (
  username: string,
  password: string,
  role: Role
) => {
  const user = await prisma.user.findUnique({ where: { username: username } });

  if (user) {
    throw new Error("Username already exists");
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      passwordHash: await hashPassword(password),
      role: role,
    },
  });

  const { passwordHash, ...data } = newUser;
  return data;
};
