import soap from "soap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GATEWAY = process.env.GATEWAY_URL || "http://localhost:8080";

// ✅ WSDL for building the client
const WSDL_URL = `${GATEWAY}/billing/FacturationService.svc?wsdl`;
// ✅ Endpoint for actual SOAP calls
const ENDPOINT = `${GATEWAY}/billing/FacturationService.svc`;

export async function POST(req) {
  const { operation, args } = await req.json(); // { operation: "GetInvoiceById", args: {...} }

  try {
    const client = await soap.createClientAsync(WSDL_URL);
    client.setEndpoint(ENDPOINT);

    const fn = client[`${operation}Async`];
    if (typeof fn !== "function") {
      return Response.json(
        {
          message: "Invalid SOAP operation",
          operation,
          available: Object.keys(client).filter((k) => k.endsWith("Async")),
        },
        { status: 400 }
      );
    }

    const [result] = await fn.call(client, args || {});
    return Response.json(result, { status: 200 });
  } catch (e) {
    return Response.json(
      { message: "SOAP call failed", error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
