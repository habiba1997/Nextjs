"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const NavigationTestPage = () => {

  // CLIENT SIDE NAVIGATION ( this is a client side component)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q")

  // console.log(q)

  const handleClick = ()=>{
    // router.push("/")
    // router.replace("/" ) // won't be saved in browser history
    // router.refresh("/") // re-render page
    router.back()
    // router.forward()
  }

  return (
    <div>
      <Link href="/" prefetch={false}>Click here</Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  )
}

export default NavigationTestPage