import type { LayoutServerLoad } from "../$types";
import { fetchAPI } from '$lib/functions.js';
import { goto } from "$app/navigation";
import { error, fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  const parent = await event.parent()
  const per = parent.permissions;

  if(!per.includes("auth:read") && !per.includes("auth:write")){
    throw error(401, "Insufficient permissions")
  }
  
  let response = await fetchAPI(`users`, "GET", event.cookies.get("access_token") ?? "")
  let result = await response.json()

  return {
    users: result,
    cookie: event.cookies.get("access_token") ?? ""
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
    const data = await event.request.formData();
		const email = data.get('email');
		const password = data.get('password');
    const role = data.get("role");
    const username = data.get("name")

    const body = {
      email: email,
      password: password,
      role: role,
      username: username
    };
  
    let response = await fetchAPI(`users`, "POST", event.cookies.get("access_token") ?? "", body)
    let result =  await response.json()

    if(response.status === 409){
      return fail(409, { fail: true, message: 'Duplicate Email'});
    }

    return {success: true}
	}
};

