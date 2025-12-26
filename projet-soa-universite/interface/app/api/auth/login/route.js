export const dynamic = "force-dynamic";

const GATEWAY = process.env.GATEWAY_URL || "http://localhost:8080";

export async function POST(req) {
  const body = await req.text();
  const res = await fetch(`${GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": req.headers.get("content-type") || "application/json",
    },
    body,
    cache: "no-store",
  });   
 
  const resBody = await res.text();
  const ct = res.headers.get("content-type") || "application/json";

  return new Response(resBody, {
    status: res.status,
    headers: { "content-type": ct },
  });
}
