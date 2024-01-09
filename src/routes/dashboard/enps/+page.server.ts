import type { LayoutServerLoad } from "../$types";

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
  const result = await event.parent();

  return {
    cookie: event.cookies.get("access_token") ?? "",
    filter: result.filterUser
  };
};
