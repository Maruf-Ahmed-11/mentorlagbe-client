import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("mentorlagbe");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    trustedOrigins: [
        "https://*.vercel.app",
        ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
        ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL ? [process.env.NEXT_PUBLIC_BETTER_AUTH_URL] : []),
        ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ],
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "student",
                input: true,
            },
            plan: {
                type: "string",
                required: false,
                defaultValue: "free",
                input: true,
            },
            phone: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
            bio: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [jwt()],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60,
        },
    },
});