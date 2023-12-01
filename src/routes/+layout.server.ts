import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    pathname: event.url.pathname,
    slug: event.params?.slug
  };
};
