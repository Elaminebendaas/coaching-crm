import NextAuth, { type DefaultSession} from "next-auth";
import {JWT} from "next-auth/jwt";

export type ExtendedUser =  DefaultSession["user"] & {
    role: "COACH" | "STUDENT";
    subscription?: "FREE" | "BASIC" | "PRO";
    };

declare module "next-auth" {
    interface Session{
        user: ExtendedUser;
    }

}

declare module "next-auth/jwt" {
    interface JWT{
        role?: "COACH" | "STUDENT";
        subscription?: "FREE" | "BASIC" | "PRO";
    }
}