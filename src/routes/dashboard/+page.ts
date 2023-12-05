import { fetchAPI } from "$lib/functions.js";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let response = await fetchAPI("sessions", "GET");
  let json = await response.json();

  return {
    sessions: json,
  };
}
