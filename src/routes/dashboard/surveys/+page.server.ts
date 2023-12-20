import { fetchAPI } from '$lib/functions.js';
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async (event) => {

  const data  = await event.parent(); 

  let sessionsResponse : Response;
  let sessionsJson : JSON;

  let templatesResponse : Response;
  let templatesJson : JSON;

  sessionsResponse = await fetchAPI("sessions", "GET", event.cookies.get("access_token") ?? "")
  sessionsJson = await sessionsResponse.json();

  templatesResponse = await fetchAPI("templates", "GET", event.cookies.get("access_token") ?? "")
  templatesJson = await templatesResponse.json();
  
  return {
    sessions: sessionsJson,
    templates: templatesJson,
    cookie: event.cookies.get("access_token") ?? "",
    filter: data.filterUser
  };
}