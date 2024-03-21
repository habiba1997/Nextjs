"use client"

import {addPost} from "@/lib/action";
import styles from "./adminPostForm.module.css";
import {useFormState} from "react-dom";

const AdminPostForm = ({userId}) => {
    // NOTE state => client component
    const [state, formAction] = useFormState(addPost, undefined);

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New Post</h1>
            <input type="hidden" name="userId" value={userId}/>
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="slug" placeholder="slug"/>
            <input type="text" name="img" placeholder="img"/>
            <textarea type="text" name="body" placeholder="body" rows={10}/>
            <button>Add</button>
            <span className={styles.error}>{state?.error}</span>
        </form>
    );
};

export default AdminPostForm;
