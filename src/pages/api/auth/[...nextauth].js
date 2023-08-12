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

const nextAuthConfig = {
  ...options,
  callbacks: {
    async signIn(user, account, profile) {
      // Handle sign-in logic here...
      console.log("Sign In pressed")
      const dispatch = useDispatch();
      dispatch(setUser(user)); // Update the user in the session state
      return true;
    },
    async signOut(user, account) {
      // Handle sign-out logic here...
      console.log("Sign Out pressed")
      const dispatch = useDispatch();
      dispatch(clearUser()); // Clear the user from the session state
      return true;
    },
  },
};

export default NextAuth(nextAuthConfig);
