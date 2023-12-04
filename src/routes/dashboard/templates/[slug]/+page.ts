
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let html_data = await fetchAPI(`email/${params.slug}`, "GET")
  const json = await html_data.text();
  return {
    html: json,
    template: params.slug
  };
}
