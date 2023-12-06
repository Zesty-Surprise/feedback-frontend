import type { LayoutServerLoad } from "../../$types";
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  return {
    cookie: event.cookies.get("access_token") ?? ""
  };
}
