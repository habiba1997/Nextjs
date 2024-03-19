// important to identify that this is a server
"use server";

import {revalidatePath} from "next/cache";
import {connectToDb} from "@/lib/utils";
import {Post, User} from "@/lib/models";
import {signIn, signOut} from "@/lib/auth";


export const addPost = async (formData, prevState) => {
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");
    console.log("form data", formData)
    console.log("Object.fromEntries(formData)", Object.fromEntries(formData))
    const {title, body, slug, userId} = Object.fromEntries(formData);

    try {
        await connectToDb();
        const newPost = new Post({
            title,
            body,
            slug,
            userId,
        });

        await newPost.save();
        console.log("saved to db");
        // invalidate the cache of get requests in /blog
        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

export const deletePost = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        await connectToDb();

        await Post.findByIdAndDelete(id);
        console.log("deleted from db");

        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};
export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const register = async (formData, previousState) => {
    const {username, email, password, img, passwordRepeat} =
        Object.fromEntries(formData);

    // check if passwords are matching
    if (password !== passwordRepeat) {
        console.log("Passwords do not match")
        return {error: "Passwords do not match"};
    }

    // password matches
    try {
        await connectToDb();

        // check if user exist in database
        const user = await User.findOne({
            $or: [{username: username}, {email: email}],
        });

        if (user) {
            console.log("Username already exists")
            return {error: "Username already exists"};
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            // password: hashedPassword,
            password: password,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

// export const addUser = async (prevState,formData) => {
//   const { username, email, password, img } = Object.fromEntries(formData);
//
//   try {
//     connectToDb();
//     const newUser = new User({
//       username,
//       email,
//       password,
//       img,
//     });
//
//     await newUser.save();
//     console.log("saved to db");
//     revalidatePath("/admin");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };
//
// export const deleteUser = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//
//   try {
//     connectToDb();
//
//     await Post.deleteMany({ userId: id });
//     await User.findByIdAndDelete(id);
//     console.log("deleted from db");
//     revalidatePath("/admin");
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };


// export const login = async (prevState, formData) => {
//   const { username, password } = Object.fromEntries(formData);
//
//   try {
//     await signIn("credentials", { username, password });
//   } catch (err) {
//     console.log(err);
//
//     if (err.message.includes("CredentialsSignin")) {
//       return { error: "Invalid username or password" };
//     }
//     throw err;
//   }
// };
