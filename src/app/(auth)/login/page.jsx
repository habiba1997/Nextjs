import styles from "./login.module.css";
// import {auth, signIn} from "@/lib/auth";
import {handleGithubLogin} from "@/lib/action";
import Link from "next/link";
import LoginForm from "@/components/loginForm/loginForm";

const LoginPage = () => {
    // const session = await auth();
    // console.log(session)
    // you can find it in action.js inside /lib
    // const handleGithubLogin = async () => {
    //     "use server";
    //     await signIn("github")
    // }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login with Github</button>
                </form>
                <LoginForm/>
            </div>
        </div>
    );
}

export default LoginPage;