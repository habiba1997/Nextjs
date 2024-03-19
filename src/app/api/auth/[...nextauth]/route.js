export { GET, POST } from "@/lib/auth"

// here https://authjs.dev/getting-started/providers/oauth-tutorial
// you can find why did we create the folder structure and file like this
//auth js create and handle all the endpoints for us

//Behind the scenes, this creates all the relevant OAuth API routes within /api/auth/* so that auth API requests to:
//
// GET /api/auth/signin
// POST /api/auth/signin/:provider
// GET/POST /api/auth/callback/:provider
// GET /api/auth/signout
// POST /api/auth/signout
// GET /api/auth/session
// GET /api/auth/csrf
// GET /api/auth/providers
// can be handled by NextAuth.js. In thi