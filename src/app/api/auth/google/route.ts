import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch("http://localhost:3000/auth/google");
  const data = await response.json();
  return NextResponse.json(data);
}

// export async function POST(request: NextRequest) {
//   console.log(request.body, "check");
//   const formData = await request.formData();
//   const formDataObj = Object.fromEntries(formData);
//   console.log(formDataObj);
//   return NextResponse.json({ provider: "Google Auth Post" });
// }
