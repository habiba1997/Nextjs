import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/models";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {authConfig} from "@/lib/auth.config";

const login = async (credentials) => {
    try {
        await connectToDb();
        const user = await User.findOne({username: credentials.username});
        if (!user) {
            throw new Error("Wrong credentials!");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Wrong credentials!");
        }

        return user;
    } catch (err) {
        throw new Error("Failed to login!");
    }
};

//  reach user sessions, use signIn and sign out methods
// GET AND POST are called from inside /api/auth/[..nextauth]
export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    // here we are extending the object and merging the two
    ...authConfig,
    providers: [GitHub({
        clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET,
    }), CredentialsProvider({
        // we are handling the sign in from username and password
        async authorize(credentials) {
            try {
                // console.log("handling login")
                return await login(credentials);
            } catch (err) {
                // todo - why when returning error it caused such a headache
                // we will not return any user
                return null;
            }
        },
    }),], // after sign in using GitHub => we want to add the user to our database and return the user from database
    callbacks: {
        async signIn({user, account, profile}) {
            // console.log("callback for signIn", user)

            //  if user is authenticated with GitHub account => connect to database and fnd this user
            if (account.provider === "github") {

                await connectToDb();
                try {
                    // if user exist in database
                    user = await User.findOne({email: profile.email});

                    if (!user) {
                        const newUser = new User({
                            // NOTE: take care what the provider object return is and each field requires, note that in external provider authentication
                            // we will not be using password
                            username: profile.login, email: profile.email, img: profile.avatar_url, isAdmin: true,
                        });

                        await newUser.save();
                    }
                } catch (err) {
                    console.log("call back after signing in with github: ", err);
                    return false;
                }
            }
            return true;
        },
        // because the callback here will override the authConfigCallback
        ...authConfig.callbacks,
    },
});