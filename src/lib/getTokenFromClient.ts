import { authClient } from "./auth-client";

/**
 * Retrieves the current user's signed JWT token on the client side
 * using the BetterAuth jwtClient plugin and syncs it with localStorage.
 */
export const getTokenFromClient = async (): Promise<string | null> => {
  try {
    const { data } = await authClient.token();
    const token = data?.token;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("access-token", token);
    }
    return token || (typeof window !== "undefined" ? localStorage.getItem("access-token") : null);
  } catch (error) {
    console.error("Error retrieving JWT token from client:", error);
    return typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  }
};
