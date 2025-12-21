import MySQLStoreFactory from "express-mysql-session";
import session from "express-session";
import mysql from "mysql2/promise";

const MySQLStore = MySQLStoreFactory(session as any);
const connection = mysql.createPool(process.env["SESSION_URL"]);
export const sessionStore = new MySQLStore({}, connection as any);
