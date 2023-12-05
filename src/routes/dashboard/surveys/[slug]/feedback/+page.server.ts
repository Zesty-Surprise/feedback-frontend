import type { LayoutServerLoad } from "../../../$types";
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  let response = await fetchAPI(`sessions/${event.params.slug}`, "GET", event.cookies.get("access_token") ?? "")
  let json = await response.json();
  return {
    session: json,
    cookie: event.cookies.get("access_token") ?? ""
  };
}