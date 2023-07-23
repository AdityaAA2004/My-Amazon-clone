import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '509246237994-4q1tckhpo2813q5i3qn85d82vlnfne4r.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
}
export default NextAuth(authOptions);