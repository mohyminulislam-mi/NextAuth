"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
export const postUser = async (payload) => {
  console.log(payload);

  // 1. check user or not
  const isExit = await dbConnect("users").findOne({ email: payload });
  if (isExit) {
    return {
      success: false,
      massage: "user already existed",
    };
  }

  const hassPassword = await bcrypt.hash(payload.password, 10);
  console.log(hassPassword);

  // 2. create new user
  const newUser = {
    ...payload,
    createdAt: new Date().toDateString(),
    role: "user",
    password: hassPassword,
  };

  console.log(newUser);

  // 3. send user to database
  const result = await dbConnect("users").insertOne(newUser);
  if (result.acknowledged) {
    return {
      success: true,
      massage: `user register successful ${result.insertedId.toString(0)}`,
    };
  }
};
