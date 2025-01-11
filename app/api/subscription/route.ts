// app/api/subscription/route.ts
import { getUserSubscriptionAndProjects } from "@/index";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUserSubscriptionAndProjects();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscription data" }, { status: 500 });
  }
}