import type { LayoutServerLoad } from "../$types";
import { fetchAPI } from '$lib/functions.js';
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  const parent = await event.parent()
  const per = parent.permissions;

  if(!per.includes("template:read")){
    throw error(401, "Insufficient permissions")
  }
  return {
    cookie: event.cookies.get("access_token") ?? ""
  };
}
