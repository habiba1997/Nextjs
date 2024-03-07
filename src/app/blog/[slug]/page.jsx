import Image from "next/image";
import styles from "./singlePost.module.css";
import {Suspense} from "react";

const SinglePostPage = () => {
    // const { slug } = params;

    return (
        <div className={styles.container}>
            {/*{post.img && (*/}
            <div className={styles.imgContainer}>
                <Image src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill
                       className={styles.img}/>
                {/*<Image src={post.img} alt="" fill className={styles.img} />*/}
            </div>
            {/*)}*/}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                {/*<h1 className={styles.title}>{post.title}</h1>*/}
                <div className={styles.detail}>
                    <Image src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""
                           width={50} height={50}/>
                    {/*{post && (*/}
                    {/*    <Suspense fallback={<div>Loading...</div>}>*/}
                    {/*        <PostUser userId={post.userId} />*/}
                    {/*    </Suspense>*/}
                    {/*)}*/}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>Terry Jeferson</span>
                    </div>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        {/*<span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>*/}
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                {/*<div className={styles.content}>{post.desc}</div>*/}
                <div className={styles.content}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,</div>
            </div>
        </div>
    );
};

export default SinglePostPage;