import type { LayoutServerLoad } from "../../../$types";
import { fetchAPI } from '$lib/functions.js';

/** @type {import('./$types').PageLoad} */
export const load: LayoutServerLoad = async (event) => {
    let response = await fetchAPI(`sessions/${event.params.slug}`, "GET", event.cookies.get("access_token") ?? "")
    let json = await response.json();

    let completedForms = await json.forms.map((form: any) => {
        // Check if form has been completed
        if (form.completed == true) {
            // Check if written feedback has been written
            if (form.custom[0].custom != undefined) {
                // Define employee's type depending on the eNPS score
                const score = form.score;
                if (score < 7) {
                    form.type = "detractor";
                } else if (score < 9) {
                    form.type = "neutral";
                } else {
                    form.type = "promoter";
                }
                return form
            }
        }
    })

    return {
        session: json,
        completedForms,
        cookie: event.cookies.get("access_token") ?? ""
    };
}
