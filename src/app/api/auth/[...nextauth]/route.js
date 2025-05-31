import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utiles/connectDB";
import { verifyPassword } from "@/utiles/auth";
import User from "../../../../../models/User";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import TrezSMSClient from "trez-sms-client";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { phone, password, loginCode, loginWithCode } = credentials;
        console.log(credentials);
        try {
          await connectDB();
        } catch (error) {
          throw new Error("مشکلی در سرور رخ داده است");
        }
        if (loginWithCode == "true" && loginWithCode != undefined) {
          console.log("avali", { phone, loginCode });
          if (!phone || !loginCode) {
            throw new Error("لطفا اطلاعات معتبر وارد کنید");
          }
        } else {
          console.log("dovome", { phone, password, loginCode });
          if (!phone || !password) {
            throw new Error("لطفا اطلاعات معتبر وارد کنید");
          }
        }

        const phoneNumber = parsePhoneNumberWithError(phone, "IR");
        if (!isValidPhoneNumber(phoneNumber?.nationalNumber, "IR")) {
          throw new Error("شماره موبایل معتبر نیست.");
        }

        const nationalNumber = phoneNumber?.nationalNumber;

        // Check if the number starts with 9 (common Iranian mobile prefix)
        console.log({ nationalNumber });
        if (!/^(9)/.test(nationalNumber)) {
          throw new Error("شماره موبایل باید با 09 یا 9 شروع شود.");
        }

        const user = await User.findOne({ phone: nationalNumber });
        if (!user) throw new Error("لطفا ثبت نام کنید");
        if (loginWithCode == "true") {
          const client = new TrezSMSClient(
            process.env.SMS_USERNAME,
            process.env.SMS_PASSWORD
          );
          console.log("codeeeeeeeeee-----", loginCode);
          const isvalid = await client.checkCode(`0${phone}`, loginCode);
          if (!isvalid) {
            throw new Error("کد تایید اشتباه است");
          }
        } else {
          const isValid = await verifyPassword(password, user?.password);
          if (!isValid) throw new Error("اطلاعات معتبر نیست");
        }
        return { phone: user?.phone, role: user?.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        console.log("update");
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (session?.name) token.name = session?.name;
        if (session?.phone) token.phone = session?.phone;
        if (session?.role) token.role = session?.role;
        // if (session?.image) token.image = session.image;

        return token;
      }
      if (user) {
        token.phone = user?.phone;
        token.name = user?.name;
        token.role = user?.role;
        // token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phone = token?.phone;
      session.user.name = token?.name;
      session.user.role = token?.role;
      // session.user.image = token.image;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
