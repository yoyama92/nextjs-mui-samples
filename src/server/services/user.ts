import type { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import type { Session } from "next-auth";

export const findUserByEmail = (prisma: PrismaClient) => {
  return async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };
};

export const saveAuthenticatedUser = (prisma: PrismaClient) => {
  return async (
    user: {
      email: string;
      name?: string;
      role: Session["user"]["role"];
    },
    account: {
      refreshToken?: string;
    },
  ) => {
    await prisma.$transaction(async (prisma) => {
      const { refreshToken } = await prisma.user.findUniqueOrThrow({
        where: {
          email: user.email,
        },
      });

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          name: user.name,
          refreshToken: account.refreshToken,
        },
      });

      if (refreshToken) {
        const oauth2Client = getOAuthClient(user.role);
        await oauth2Client
          .revokeToken(refreshToken)
          .then((result) => {
            console.log(result);
            return result.status === 200;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
};

// biome-ignore lint/style/useNamingConvention: <explanation>
const getOAuthClient = (userRole: Session["user"]["role"]) => {
  if (userRole === "admin") {
    return new google.auth.OAuth2({
      clientId: process.env.GOOGLE2_CLIENT_ID,
      clientSecret: process.env.GOOGLE2_CLIENT_SECRET,
    });
  }

  return new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
};

export const refreshAccessToken = async (
  token: { accessToken?: string | null; refreshToken?: string | null },
  user: {
    role: Session["user"]["role"];
  },
) => {
  const oauth2Client = getOAuthClient(user.role);
  oauth2Client.setCredentials({
    // biome-ignore lint/style/useNamingConvention: <explanation>
    access_token: token.accessToken,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    refresh_token: token.refreshToken,
  });
  const { credentials } = await oauth2Client.refreshAccessToken();
  if (credentials.access_token && credentials.expiry_date) {
    return {
      accessToken: credentials.access_token,
      expiresAt: credentials.expiry_date,
    };
  }
};
