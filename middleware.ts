import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/collection(.*)",
    "/product(.*)",
    "/seller(.*)",
    "/products(.*)",
    "/auth(.*)",
    "/api/uploadthing",
  ],
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
