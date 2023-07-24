import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Add other providers here if needed
  ],

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
