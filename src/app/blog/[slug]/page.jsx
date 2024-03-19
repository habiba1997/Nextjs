import Image from "next/image";
import styles from "./singlePost.module.css";
import {Suspense} from "react";
import PostUser from "@/components/postUser/postUser";
import {getPost} from "@/lib/data";

const getData = async (postId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};

//  this is fetching params from Server side component
const SinglePostPage = async ({params, searchParams}) => {
    const {slug} = params;
    // WITH AN API
    // const post = await getData(slug)

    // Without an api
    const post = await getPost(slug)

    return (
        <div className={styles.container}>
            {post.img && (
                <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" fill className={styles.img}/>
                </div>
            )}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    {post && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId={post.userId}/>
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        {/*<span className={styles.detailValue}>01.01.2024</span>*/}
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>{post.body}</div>

            </div>
        </div>
    );
};

export default SinglePostPage;