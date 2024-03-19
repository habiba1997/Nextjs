import Links from "@/components/navbar/links/Links";
import styles from "./navbar.modules.css"
import Link from "next/link";
import {auth} from "@/lib/auth";

const NavBar = async () => {
    const session = await auth()

    return (
        <div className={styles.container}>
            {/*<Link href="/" className={styles.logo}>Logo</Link>*/}

            <div>
                <Links session={session}></Links>
            </div>

        </div>
    )
}

export default NavBar;