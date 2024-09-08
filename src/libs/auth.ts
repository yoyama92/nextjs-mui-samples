import "server-only";

import { prisma } from "@/server/infrastructures/client";
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

const jwt = ({
  token,
  user,
}: { token: JWT; user: User | AdapterUser }): JWT => {
  if (user) {
    return {
      ...token,
      user: user,
      role: user.role,
    };
  }
  return token;
};

const session = ({ session, token }: { session: Session; token: JWT }) => {
  return {
    ...session,
    user: {
      ...session.user,
      role: token.role,
    },
  };
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
  },
  events: {
    signIn: async ({
      user,
      account,
    }: {
      user: User;
      account: Account | null;
    }) => {
      await prisma.$transaction(async (prisma) => {
        if (user.email) {
          const { id } = await prisma.user.upsert({
            where: {
              email: user.email,
            },
            update: {
              name: user.name,
            },
            create: {
              email: user.email,
              name: user.name,
            },
          });

          if (account?.access_token || account?.refresh_token) {
            await prisma.token.create({
              data: {
                userId: id,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                expiresAt: account.expires_at,
              },
            });
          }
        }
      });
    },
  },
};

export const getServerAuthSession = () => getServerSession(authConfig);
