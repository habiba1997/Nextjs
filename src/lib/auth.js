import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/models";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDb } from "./utils";
// import { User } from "./models";
// import bcrypt from "bcryptjs";
// import { authConfig } from "./auth.config";

// const login = async (credentials) => {
//   try {
//     connectToDb();
//     const user = await User.findOne({ username: credentials.username });
//
//     if (!user) throw new Error("Wrong credentials!");
//
//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );
//
//     if (!isPasswordCorrect) throw new Error("Wrong credentials!");
//
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to login!");
//   }
// };

//  reach user sessions, use signIn and sign out methods
// GET AND POST are called from inside /api/auth/[..nextauth]
export const {handlers: {GET, POST}, auth, signIn, signOut,}
    = NextAuth({
    // ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        //   CredentialsProvider({
        //     async authorize(credentials) {
        //       try {
        //         const user = await login(credentials);
        //         return user;
        //       } catch (err) {
        //         return null;
        //       }
        //     },
        //   }),
    ],
    // after sign in => we want to add the user to our database and return the user from database
    callbacks: {
        async signIn({user, account, profile}) {
            console.log("callback for signIn")
            console.log(user, account, profile)
            //  if user is authenticated with github account => connect to database and fnd this user
            if (account.provider === "github") {
                await connectToDb();
                try {
                    // if user exist in database
                    const user = await User.findOne({email: profile.email});

                    if (!user) {
                        const newUser = new User({
                            // NOTE: take care what the provider object return is and each field requires, note that in external provider authentication
                            // we will not be using password
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        });

                        await newUser.save();
                    }
                    return true
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
            return false;
        },
        // ...authConfig.callbacks,
    },
});