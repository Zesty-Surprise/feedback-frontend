import type { LayoutServerLoad } from "../$types";
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  let response = await fetchAPI(`templates`, "GET", event.cookies.get("access_token") ?? "")
  let result = await response.json();
  return {
    templates: result,
    cookie: event.cookies.get("access_token") ?? ""
  };
}