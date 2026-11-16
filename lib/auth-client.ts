import { createAuthClient } from "better-auth/react";

/**
 * Better Auth browser client. Requests are sent to the same origin
 * (`/api/auth/*`), so no `baseURL` is needed.
 */
export const authClient = createAuthClient();
