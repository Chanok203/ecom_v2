import "express-session";
import { Role } from "../../generated/prisma/enums";

declare module "express-session" {
    interface SessionData {
        user: {
            username: string,
            role: Role,
        }
    }
}