import type { LayoutServerLoad } from "../$types";
import { fetchAPI } from '$lib/functions.js';
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  const parent = await event.parent()
  const per = parent.permissions;

  if(!per.includes("auth:read") && !per.includes("auth:write")){
    throw error(401, "Insufficient permissions")
  }
  
  let response = await fetchAPI(`users`, "GET", event.cookies.get("access_token") ?? "")
  let result = await response.json();

  return {
    users: result,
    cookie: event.cookies.get("access_token") ?? ""
  };
}