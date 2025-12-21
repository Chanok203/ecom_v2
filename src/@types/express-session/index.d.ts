import "express-session";
import { Role } from "../../generated/prisma/enums";

declare module "express-session" {
    interface SessionData {
        user: {
            id: number,
            username: string,
            role: Role,
        }
    }
}