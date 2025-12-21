import { createUser } from "./modules/admin/user/user-service";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

import "./core/prisma";

const main = async () => {
  const username = "chanok";
  const password = "1234";
  const role = "ADMIN";

  try {
    const user = await createUser(username, password, role);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

main();
