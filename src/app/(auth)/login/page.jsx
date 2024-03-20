import styles from "./login.module.css";
// import {auth, signIn} from "@/lib/auth";
import {handleGithubLogin, login} from "@/lib/action";
import Link from "next/link";

const LoginPage = async () => {
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
                <form className={styles.form} action={login}>
                    <input type="text" placeholder="username" name="username"/>
                    <input type="password" placeholder="password" name="password"/>
                    <button>Login</button>
                    {/*{state?.error}*/}
                    <Link href="/register">
                        {"Don't have an account?"} <b>Register</b>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;