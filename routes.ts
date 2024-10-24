/* 
    An array of public routes that do not require authentication.
 */
export const publicRoutes = ["/", "/auth/new-verification", ""];

/* 
    Routes that are used for authentication.
    They will redirect users to their respective dashboards
 */
export const authRoutes = ["/auth/login", "/auth/signup", '/auth/reset', '/auth/error', '/auth/new-password'];

/* 
    Routes that start with this prefix are used for API authentication.
*/
export const apiAuthPrefix = "/api/auth";

/* 
    The default redirect path for coaches and students respectively.
 */
export const DEFAULT_COACH_LOGIN_REDIRECT = "/coach";
export const DEFAULT_STUDENT_LOGIN_REDIRECT = "/student";
