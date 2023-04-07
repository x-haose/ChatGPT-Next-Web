import { NextRequest } from "next/server";

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiUrl = req.headers.get("openai_url");

  console.log("[openaiUrl] ", openaiUrl);

  return fetch(openaiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}
