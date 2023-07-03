import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  let json_response = {
    status: "success",
    results: "test data",
    feedbacks: {
      key: "test value"
    },
  };
  return NextResponse.json(json_response);
}
