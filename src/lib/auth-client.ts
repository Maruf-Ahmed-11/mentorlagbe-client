import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    (typeof window !== "undefined" ? window.location.origin : undefined) ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.BETTER_AUTH_URL ||
    "https://mentorlagbe-9oiym1a9a-mugiwara14.vercel.app",
  plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
});

