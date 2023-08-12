import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useDispatch } from "react-redux";
// import CredentialsProvider from "next-auth/providers/credentials"
// import { FirestoreAdapter } from "@auth/firebase-adapter";
// import { app, db } from "../../../../firebase";
// import * as firestoreFunctions from 'firebase/firestore'
// import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const options = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Handle sign-in logic here...
      const dispatch = useDispatch();
      dispatch(setUser(user)); // Update the user in the session state
      return true;
    },
    async signOut(user, account) {
      // Handle sign-out logic here...
      const dispatch = useDispatch();
      dispatch(clearUser()); // Clear the user from the session state
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
