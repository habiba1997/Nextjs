import Links from "@/components/navbar/links/Links";
import styles from "./navbar.modules.css"
import Link from "next/link";

const NavBar = () => {
    return (
        <div className={styles.container}>
            {/*<Link href="/" className={styles.logo}>Logo</Link>*/}

            <div>
                <Links></Links>
            </div>

        </div>
    )
}

export default NavBar;