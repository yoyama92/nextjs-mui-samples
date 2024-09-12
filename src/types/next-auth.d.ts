import type { DefaultUser, DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    /**
     * user role
     */
    role: "user" | "admin";
  }

  interface JWT extends DefaultJWT {
    /**
     * user role
     */
    role: "user" | "admin";
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      role: "user" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    /**
     * user role
     */
    role: "user" | "admin";
  }
}
