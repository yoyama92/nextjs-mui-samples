import "server-only";

import {
  getServerSession,
  type Account,
  type AuthOptions,
  type Session,
  type User,
} from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { getCaller } from "@/libs/trpc";

const CustomGoogleProvider = ({
  id,
  clientId,
  clientSecret,
  role,
}: {
  id: string;
  clientId: string;
  clientSecret: string;
  role: "user" | "admin";
}) => {
  return GoogleProvider({
    id: id,
    clientId: clientId,
    clientSecret: clientSecret,
    authorization: {
      params: {
        access_type: "offline",
        response_type: "code",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/calendar.readonly",
        ].join(" "),
      },
    },
    profile(profile) {
      return {
        ...profile,
        id: profile.sub,
        image: profile.picture,
        role: role,
      };
    },
  });
};

const jwt = async ({
  token,
  user,
  account,
}: {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
}): Promise<JWT> => {
  if (user && account) {
    return {
      ...token,
      role: user.role,
      accessToken: token.accessToken || {
        token: account.access_token,
        expiresAt: account.expires_at,
      },
    };
  }

  const expiresAt = token.accessToken.expiresAt;
  if (expiresAt < Date.now() / 1000) {
    // sessionを設定しないとsessionの取得処理でこの関数が呼ばれるので無限ループになる。
    // 無限ループを避けるためにsessionと同等の内容を設定する。
    const caller = await getCaller({
      session: {
        user: {
          ...token,
        },
        expires: new Date(Date.now() + 60).toISOString(),
      },
    });
    const accessToken = await caller.user.refreshAccessToken();
    if (accessToken) {
      return {
        ...token,
        accessToken: {
          token: accessToken.accessToken,
          expiresAt: accessToken.expiresAt,
        },
      };
    }
  }
  return token;
};

const session = ({ session, token }: { session: Session; token: JWT }) => {
  return {
    ...session,
    user: {
      ...session.user,
      role: token.role,
      token: token.token,
      accessToken: token.accessToken,
    },
  };
};

const signIn = async ({
  user,
  account,
}: {
  user: User;
  account: Account | null;
}) => {
  if (!user.email) {
    return false;
  }
  try {
    const caller = await getCaller();
    await caller.user.saveAuthenticatedUser({
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      account: {
        refreshToken: account?.refresh_token,
      },
    });
    return true;
  } catch {
    return false;
  }
};

export const authConfig: AuthOptions = {
  providers: [
    CustomGoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      role: "user",
    }),
    CustomGoogleProvider({
      id: "google2",
      clientId: process.env.GOOGLE2_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE2_CLIENT_SECRET ?? "",
      role: "admin",
    }),
  ],
  callbacks: {
    jwt: jwt,
    session: session,
    signIn: signIn,
  },
  events: {
    signOut: async ({ session }: { session: Session }) => {
      const caller = await getCaller({
        session: session,
      });
      await caller.user.signOut();
    },
  },
};

export const getServerAuthSession = () => getServerSession(authConfig);
