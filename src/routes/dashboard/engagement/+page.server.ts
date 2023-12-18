import type { LayoutServerLoad } from "../$types";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  return {
    cookie: event.cookies.get("access_token") ?? "",
  };
};
