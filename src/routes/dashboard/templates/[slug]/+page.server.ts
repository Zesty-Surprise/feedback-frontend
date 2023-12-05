import type { LayoutServerLoad } from "../../$types";
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  
  let response = await fetchAPI(`email/${event.params.slug}`, "GET", event.cookies.get("access_token") ?? "")
  let text = await response.text();
  
  return {
    template: event.params.slug,
    html: text,
    cookie: event.cookies.get("access_token") ?? ""
  };
}
