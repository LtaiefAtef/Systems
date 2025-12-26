import soap from "soap";
import fs from "fs/promises";
import os from "os";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GATEWAY = process.env.GATEWAY_URL || "http://api-gateway:8080";
const WSDL_URL = `${GATEWAY}/courses/CourseService?wsdl`;
const ENDPOINT = `${GATEWAY}/courses/CourseService`;

export async function POST(req) {
  const { operation, args } = await req.json();

  try {
    // 1) Get WSDL via gateway
    const wsdlText = await fetch(WSDL_URL, { cache: "no-store" }).then((r) => r.text());

    // 2) Patch imports + soap:address to go through the gateway
    const patchedWsdl = wsdlText.replaceAll(
      "http://course-service:8083",
      `${GATEWAY}/courses`
    );

    // 3) Write patched WSDL to temp file (node-soap can load from file path)
    const wsdlPath = path.join(os.tmpdir(), `CourseService-${Date.now()}.wsdl`);
    await fs.writeFile(wsdlPath, patchedWsdl, "utf8");

    // 4) Create client from patched WSDL and force endpoint to gateway
    const client = await soap.createClientAsync(wsdlPath);
    client.setEndpoint(ENDPOINT);

    const fn = client[`${operation}Async`];
    if (typeof fn !== "function") {
      return Response.json({ message: "Invalid SOAP operation", allowed: ["getAllCourses", "getCourseByCode", "addCourse", "updateCourse", "deleteCourse"] }
        , { status: 400 });
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

