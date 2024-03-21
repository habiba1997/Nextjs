import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// if you are not using /src directory add this file in root directory not /app directory
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware