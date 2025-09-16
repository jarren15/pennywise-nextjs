import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const POST = (request: NextRequest) => {
  console.log(request.body);
  return NextResponse.json({ message: "success POST" });
};

const GET = (request: NextRequest) => {
  console.log(request.body);
  return NextResponse.json({ message: "success GET" });
};

export { GET, POST };
