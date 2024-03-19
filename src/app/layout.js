import {Inter} from "next/font/google";
// common styles for all
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({subsets: ["latin"]});

// This help metadata in about and contact page to be more dynamic
export const metadata = {
    title: {
        default:"Next.js 14 Homepage",
        template:"%s | Next.js 14"
    },
    description: "Next.js starter app description",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/*even if you wrap the application with a client side component, its just a wrapper, rest of applications are server side components*/}
        {/* <ClientSideProviderTest> */}
        <div className="container">
            <Navbar/>
            {children}
            <Footer/>
        </div>
        {/* </ClientSideProviderTest> */}
        </body>
        </html>
    );
}
