import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Retrieves the current user's signed JWT token on the server side.
 * Sends the incoming request headers to auth.api.getToken().
 */
export const getTokenFromServer = async (): Promise<string | null> => {
  try {
    const reqHeaders = await headers();
    const jwtToken = await auth.api.getToken({
      headers: reqHeaders,
    });
    return jwtToken?.token || null;
  } catch (error) {
    console.error("Error retrieving JWT token from server:", error);
    return null;
  }
};
