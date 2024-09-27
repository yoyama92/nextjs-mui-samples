import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    /**
     * user role
     */
    role: "user" | "admin";
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      role: "user" | "admin";
      accessToken: {
        token: string;
        expiresAt: number;
      };
    };
  }
}

declare module "next-auth/jwt" {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  interface JWT extends DefaultJWT {
    /**
     * user role
     */
    role: "user" | "admin";

    accessToken: {
      token: string;
      expiresAt: number;
    };
  }
}
