import { env } from "$env/dynamic/public";
import { redirect } from "@sveltejs/kit";

export async function fetchAPI(
    route: string,
    method: string,
    access_token: string,
    body?: any
): Promise<Response> {
    let request: any;
    if (method === "POST" || method === "PUT") {
        request = {
            method: method,
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            redirect: "follow",
        };
    } else {
        request = {
            method: method,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            redirect: "follow",
        };
    }

    let response = await fetch(env.PUBLIC_BACKEND_URI + route, request);
    return response;
}

export async function isLoggedIn(access_token: string) {
  const result = await fetchAPI("token/valid", "GET", access_token);
  if (result.status === 401) {
    throw redirect(303, '/auth/login');
  }
  let resp = await result.json();
  return resp
}
