import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  let sessionsResponse = await fetchAPI("sessions", "GET")
  let sessionsJson = await sessionsResponse.json();

  let templatesResponse = await fetchAPI("templates", "GET")
  let templatesJson = await templatesResponse.json();

  return {
    sessions: sessionsJson,
    templates: templatesJson,
  };
}
