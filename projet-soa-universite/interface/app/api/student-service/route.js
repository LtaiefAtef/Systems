export const dynamic = "force-dynamic";
export async function POST(req) {
    const { method, url,payload} = await req.json();
    console.log(method,url);
    let res;
    switch(method){
        case "GET":
            res = await fetch(url, {
            method,
            cache: "no-store",
            });
            break;
        case "POST":
            console.log("PAYLOAD",payload);
            res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
                cache: "no-store",
            });
            break;
        case "PUT":
            res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: payload,
                cache: "no-store",
            });
            break;
        case "DELETE":
            res = await fetch(url, {
                method: "DELETE",
                cache: "no-store",
            });
            break;
    }

    const body = await res.text();
    console.log("BODY",body)
    return new Response(body, {
        status: res.status,
        headers: {
        "content-type": res.headers.get("content-type") || "text/plain",
        },
    });
}
