export const dynamic = "force-dynamic";
export async function POST(req) {
    const { method, url,payload} = await req.json();
    console.log(payload);
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
        res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });
        break;

        case "PUT":
        res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
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
    if (res.status !== 204) {
    const body = await res.text();
    return new Response(body, {
        status: res.status,
        headers: {
        "content-type": res.headers.get("content-type") || "application/json",
        },
    });
    } else {
    return new Response(null, { status: 204 });
    }
}
