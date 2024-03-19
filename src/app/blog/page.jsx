import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import {getPosts} from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async () => {
    // by default nextjs cache the data, to make it stop caching the data
    // by default its force-cache
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "force-cache"});
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store"}); // doesn't stoe cache - re-fetch each time
    // re-validate data every 3600 sec => every hour
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {next: {revalidate: 3600}});

    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};
const BlogPage = async () => {

    // const post = {
    //     img: "https://plus.unsplash.com/premium_photo-1664203067979-47448934fd97?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     title: "Natural Face",
    //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    //     createdAt: "01.01.2024",
    //     slug: "https://unsplash.com/photos/a-close-up-of-a-person-with-frecky-hair-wtAC4c_Hj-g"
    // }

    // WITH AN API
    // const posts = await getData();

    // Without an api
    const posts = await getPosts();
    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div key={post._id} className={styles.post}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    );
}

export default BlogPage;