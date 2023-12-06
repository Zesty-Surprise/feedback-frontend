import { fetchAPI } from '$lib/functions.js';
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async (event) => {

  let sessionsResponse = await fetchAPI("sessions", "GET", event.cookies.get("access_token") ?? "")
  let sessionsJson = await sessionsResponse.json();

  let templatesResponse = await fetchAPI("templates", "GET", event.cookies.get("access_token") ?? "")
  let templatesJson = await templatesResponse.json();

  return {
    sessions: sessionsJson,
    templates: templatesJson,
    cookie: event.cookies.get("access_token") ?? ""
  };
}