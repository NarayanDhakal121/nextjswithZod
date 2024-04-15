// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import bcrypt from "bcryptjs";
// import connectDb from "@/lib/dbConnect";
// import UserModel from "@/models/User";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials: any): Promise<any> {
//         await connectDb();

//         //  for case 1
//         try {
//           const user = await UserModel.findOne({
//             $or: [
//               { email: credentials.identifiers },
//               { username: credentials.identifiers },
//             ],
//           });
//           // case 1)excepted user is received |
//           // case 2)if user is received

//           if (!user) {
//             throw new Error("NO user found with this email address");
//           }

//           // case 3)if user is not verified

//           if (!user.isVerified) {
//             throw new Error(" Please verify your account first");
//           }

//           //  Now the user found
//           //   check for password

//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (isPasswordCorrect) {
//             return user;
//           } else {
//             throw new Error("incorrect password");
//           }
//         } catch (error: any) {
//           throw new Error(error);
//         }
//       },
//     }),
//   ],

//   callbacks: {

//     async session({ session, token }) {

//      if(token){
//       session.user._id = token._id
//       session.user.isVerified = token.isVerified
//       session.user.isAcceptingMessages = token.isAcceptingMessages
//       session.user.username = token.username
//      }

//         return session
//       },
//       async jwt({ token, user}) {
//         // user dekhi token nikalera token lai powerful banauna paryo

//         if(user){

//             token._id = user._id?.toString();
//             token.isVerified = user.isVerified;
//             token.isAccetingMessages=  user.isAcceptingMessages; 
//             token.username = user.username
//         }
//         return token
//       },

//   },

//   pages:{
//     signIn: '/sign-in'
//   },

//   session:{
//     strategy: 'jwt',
//   },

  
//   secret: process.env.NEXTAUTH_SECRET,
   
//   }

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials:any): Promise<any> {
        await connectDb();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email address");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error:any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages; 
        token.username = user.username;
      }
      return token;
    },
  },

  pages: {
    signIn: '/sign-in',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

