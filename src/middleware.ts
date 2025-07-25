import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/", // redirect here if not logged in
  },
})

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
}
