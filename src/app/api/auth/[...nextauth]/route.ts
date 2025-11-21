import "next-auth";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }
  interface JWT {
    accessToken?: string;
  }
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url && url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.accessToken = jwt.sign(
          {
            email: token.email,
            name: token.name,
            picture: token.picture,
          },
          process.env.AUTH_SECRET!,
          { algorithm: "HS256", expiresIn: "30d" }
        );
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
