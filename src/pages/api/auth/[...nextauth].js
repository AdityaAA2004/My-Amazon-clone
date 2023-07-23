import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '509246237994-4q1tckhpo2813q5i3qn85d82vlnfne4r.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ],
}
export default NextAuth(authOptions);