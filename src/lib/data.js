import {Post, User} from "./models";
import {connectToDb} from "./utils";
import {unstable_noStore as noStore} from "next/cache";

// TEMPORARY DATA
const users = [
    {id: 1, name: "John"},
    {id: 2, name: "Jane"},
];

const posts = [
    {
        id: 1,
        title: "Postfgfdbfgxbfgx 1",
        body: "fjdssssnnnnnnnncvfdkngjdfnvdfuvbhbkdfhjfjdsss snnnnnnnncvfdkngjdfnvdfuvbhbk dfhjfjdssssnnnnnnnncvfdkngjdfnvd ",
        userId: 1
    },
    {
        id: 2,
        title: "Post gfhfhfg2",
        body: "fjdssssnnnnnnnncvfdkngjdfnvdfuvbhbkdfhjfjdssssnnnnnnnncvfdk ngjdfnvdfuvbhbkdfhjfjdsss snnnnnnnncvfdkngjdfnvdfuvb ",
        userId: 1
    },
    {id: 3, title: "Post hghghhgghg3", body: "fjdssssnnnnnnnncvfdkngjdfnvdfuvbhbkdf  ", userId: 2},
    {
        id: 4,
        title: "Post 4",
        body: "fjdssssnnnnnnnncvfdkngjdfnvdfuvbhbkdfhjfjdssssnnnnnnnncvfdkngjd fnvdfuvbhbkdfhjfjdssssnnnnnn nncvfdkngjdfnvdfuvbhbkdfhjfjds ",
        userId: 2
    },
];

export const getPosts = async () => {
    // return posts;

    try {
        await connectToDb();
        return await Post.find();
    } catch (err) {
        console.log(" failed to fetch posts: ", err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getPost = async (slug) => {

    // return posts.find((post) => post.id === parseInt(slug));
    try {
        await connectToDb();
        return await Post.findOne({slug});
    } catch (err) {
        console.log("Failed to fetch post!", err);
        throw new Error("Failed to fetch post!");
    }
};

export const getUser = async (id) => {
    // return users.find((user) => user.id === parseInt(id));
    // un stable - so user is not stored in cache
    noStore();
    try {
        await connectToDb();
        return await User.findById(id);
    } catch (err) {
        console.log("Failed to fetch user!", err);
        throw new Error("Failed to fetch user!");
    }
};

export const getUsers = async () => {
    try {
        await connectToDb();
        return await User.find();
    } catch (err) {
        console.log("Failed to fetch users!", err);
        throw new Error("Failed to fetch users!");
    }
};
