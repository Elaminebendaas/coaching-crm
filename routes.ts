/* 
    An array of public routes that do not require authentication.
 */
export const publicRoutes = ["/", "", ""];

/* 
    Routes that are used for authentication.
    They will redirect users to their respective dashboards
 */
export const authRoutes = ["/auth/login", "/signup"];

/* 
    Routes that start with this prefix are used for API authentication.
*/
export const apiAuthPrefix = "/api/auth";

/* 
    The default redirect path for coaches and students respectively.
 */
export const DEFAULT_COACH_LOGIN_REDIRECT = "/coach";
export const DEFAULT_STUDENT_LOGIN_REDIRECT = "/student";
