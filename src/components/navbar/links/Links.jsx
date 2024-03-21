//  if your component use any user interaction
"use client";
import NavLink from "@/components/navbar/links/navlinks/NavLink";
import styles from "./links.module.css";
import {useState} from "react";
import {handleLogout} from "@/lib/action";
// import {auth} from "@/lib/auth";

const links = [
    {
        title: "Homepage",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Blog",
        path: "/blog",
    },
];

// NOTE: async is used in SERVER side component
// BUT state (open, setOpen) can ONLY be used in client side component
const Links = ({session}) => {
    const [open, setOpen] = useState(false);


    // const session = await auth() => add it into navbar component

    const isAdmin = session ? session.user?.isAdmin : false

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => <NavLink item={link} key={link.title}/>)}
                {session && session.user ?
                    (
                        <>
                            {isAdmin && <NavLink item={{title: "Admin", path: "/admin"}}/>}
                            <form action={handleLogout}>
                                <button className={styles.logout}>Logout</button>
                            </form>
                        </>
                    )
                    : (<NavLink item={{title: "Login", path: "/login"}}/>)
                }
            </div>
            <button
                className={styles.menuButton}

                onClick={() => setOpen((prev) => !prev)}
            > Menu
            </button>
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Links;