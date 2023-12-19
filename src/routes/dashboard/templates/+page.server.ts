import type { LayoutServerLoad } from "../$types";
import { fetchAPI } from '$lib/functions.js';
import { goto } from "$app/navigation";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  const parent = await event.parent()
  const per = parent.permissions;

  if(!per.includes("template:read") && !per.includes("template:write")){
    throw error(401, "Insufficient permissions")
  }
  
  let response = await fetchAPI(`templates`, "GET", event.cookies.get("access_token") ?? "")
  let result = await response.json();
  return {
    templates: result,
    cookie: event.cookies.get("access_token") ?? ""
  };
}