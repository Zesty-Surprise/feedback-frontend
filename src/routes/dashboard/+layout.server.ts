import type { LayoutServerLoad } from "./$types";
import { isLoggedIn } from '$lib/functions.js';

export const load: LayoutServerLoad = async (event) => {
  await isLoggedIn(event.cookies.get("access_token") ?? "")
  return {
    pathname: event.url.pathname,
    slug: event.params?.slug,
    cookie: event.cookies.get("access_token")
  };
};
