import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../../slices/sessionSlice";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Other providers...
  ],
  secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(nextAuthConfig);
