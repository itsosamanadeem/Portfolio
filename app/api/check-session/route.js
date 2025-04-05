import { checkSession } from "@/lib/auth";

export async function GET(req) {
  const user = await checkSession(req);

  // if (user) {
    return new Response(JSON.stringify({ message: "User is authenticated", user }), {
      status: 200,
    });
  // }

  // return new Response(JSON.stringify({ message: "Not authenticated" }), {
  //   status: 401,
  // });
}