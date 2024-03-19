import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Creating API routes on localhost 3000
export const GET = async (request) => {
  try {
    await connectToDb();

    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
