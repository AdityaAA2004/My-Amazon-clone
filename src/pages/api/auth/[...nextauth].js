import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { app, db } from "../../../../firebase";
import * as firestoreFunctions from 'firebase/firestore'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const options = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Add other providers here if needed
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     try {
    //       const { username, password } = credentials;
    //       const auth = getAuth(app)
          
    //       // Check if the user exists in Firestore
    //       const userDocRef = doc(db, 'users', username);
    //       const userSnapshot = await getDoc(userDocRef);
    //       const userData = userSnapshot.data();

    //       if (userData) {
    //         // User exists, attempt to sign in
    //         await signInWithEmailAndPassword(auth, userData.email, password);
    //         return userData; // Return the user data if sign-in is successful
    //       } else {
    //         // User doesn't exist, create a new user
    //         const { user } = await createUserWithEmailAndPassword(auth, username, password);

    //         // Store user data in Firestore
    //         await setDoc(userDocRef, {
    //           email: user.email
    //         });

    //         return { email: user.email }; // Return user data
    //       }
    //     } catch (error) {
    //       // Handle authentication errors
    //       console.error("Authentication error:", error);
    //       return null;
    //     }
    //   }
    
    // })
    
  ],

  secret: process.env.NEXTAUTH_SECRET,
  // adapter:FirestoreAdapter({db:db, ...firestoreFunctions})
};

export default NextAuth(options);
